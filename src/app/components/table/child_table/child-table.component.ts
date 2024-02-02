import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core'
import { firstValueFrom, Subject, takeUntil } from 'rxjs'
import { fuseAnimations } from '@fuse/animations'
import { Filter } from 'app/shared/types/filter'
import { Column } from 'app/shared/types/column'
import { MainAction } from 'app/shared/types/actions/main'
import { RowAction } from 'app/shared/types/actions/row'
import { FuseConfirmationService } from '@fuse/services/confirmation'
import { MowAlertService } from 'app/components/alert'
import { confirmationDeleteOptions, confirmationDeleteScenario, confirmationOptions } from 'app/shared/confirmations/popoup'
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http'
import { TableData } from 'app/shared/types/tableData'
import { environment } from 'environments/environment'
import qs from 'qs'
import { Router } from '@angular/router'
import { ModalService } from 'app/components/modal'
import { ModalComponentData } from 'app/components/modal/modal.types'
import { ActionComponentMap } from 'app/shared/types/actions/map'
import { MowConfigService } from 'app/core/config/MowConfigService'
import { AppConfig } from 'app/core/config/app.config'
import { Pagination } from 'app/shared/types/pagination'
import { SelectionType } from '@swimlane/ngx-datatable'
import { ScenariData } from 'app/shared/types/scenariData'
import { ScenariService } from 'app/shared/services/scenari.service'

@Component({
    selector: 'child-table',
    templateUrl: './child-table.component.html',
    styleUrls: ['./child-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
    exportAs: 'childTable',
})
export class ChildTableComponent implements OnInit, OnDestroy {
  
    protected pagination = new Pagination();
    protected tableKey: string;
    public queryObject: any = {
        page: this.pagination.currentPage + 1,
        limit: this.pagination.limit,
        orderBy: [ 'id', 'desc']
    };
    protected _table_messages = {
        // Message to show when array is presented
        // but contains no values
        emptyMessage: '<div class="flex justify-center mt-2"><b><i class="fa-thin fa-beer-mug-empty mr-3"></i></i>Nessun record da mostrare</b></div>',
      
        // Footer total message
        totalMessage: 'record totali',
      
        // Footer selected message
        selectedMessage: 'selezionati'
      };

    @Input() title: string;
    @Input() remoteUrl: string;
    @Input() remoteTableData: string;
    @Input() frontRoute: string;
    @Input() targetComponent: any;
    @Input() editUrl: string;

    public filters: Filter[]        = [];
    public columns: Column[]        = [];
    public mainAction: MainAction[] = [];
    public rowAction: RowAction[]   = [];
    public rowDropDownction: RowAction[] = [];
    public displayedColumns: string[] = [];
    public dataSource: Array<any> = [];
    public searchInputs: any = {};
    public resultsLength: number = 0;
    protected _debounceTimeout: any;
    protected pageSize = 8;
    protected isLoading: boolean = false;
    public scheme: any;
    protected _unsubscribeAll: Subject<any> = new Subject<any>()
    protected selection: SelectionType;
    protected selected: Array<string> = [];
    protected scenari: Array<ScenariData> = [];

     /**
     * Constructor
     */
     constructor(
        protected _fuseConfirmationService: FuseConfirmationService,
        protected _mowAlertService: MowAlertService,
        protected _changeDetectorRef: ChangeDetectorRef,
        private _httpClient: HttpClient,
        private router: Router,
        public modalService: ModalService,
        protected _configService: MowConfigService,
        protected _scenariService: ScenariService

    )
    {
        this._configService.config$.pipe(takeUntil(this._unsubscribeAll)).subscribe((config: AppConfig) => {
            this.scheme = config.scheme
            this._changeDetectorRef.markForCheck()
        })
        this.selection = SelectionType.checkbox;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.initTableData();
    }

    /**
     * Metodo di inizializzazione tabella ( caricamento colonne, filtri etc ...)
     */
    public initTableData(): void {
        this._httpClient.get<TableData>(environment.baseUrl + this.remoteTableData).subscribe((response) => {
            this.filters = response.filters.filter((item) => { return item.child});
            this.columns = response.columns
            this.mainAction = response.mainAction
            this.rowAction = response.rowAction

            this.displayedColumns = this.columns.map((column) => column.name)
            this.filters.forEach((filter) => {
                this.searchInputs[filter.name] = ''
            })
            if (this.rowAction.length) {
                this.displayedColumns.push('Azioni');
            }
            this.getData();
            this._changeDetectorRef.markForCheck()
        });

    }

    public loadScenari() {
        this._scenariService.getScenari(this.tableKey).subscribe( res => {
            this.scenari = res;
        });
    }

    /**
     * Metodo di load state tabella
     */
    public loadTableState() {
        const state = this._configService.getTableState(this.tableKey);
        if(state) {
            this.filters = state.filters;
            this.columns = state.columns;
            this.queryObject = state.queryObject;
        }
        return state;
    }

    /**
     * Metodo di salvataggio state tabella
     */
    public saveTable() {
        this._configService.saveTableState(this.tableKey, {
            key: this.tableKey,
            filters: this.filters,
            columns: this.columns,
            queryObject: this.queryObject
        });
    }

    /**
     * Metodo di load di uno scenario
     */
    public async loadScenario(scenario: ScenariData): Promise<void> {
        this.isLoading = true;
        this.columns = [];
        await setTimeout(async () => {
            const scenarioData = await firstValueFrom(this._scenariService.load(scenario.id));
            this.filters = scenarioData.scenario.filters;
            this.columns = scenarioData.scenario.columns;
            this.queryObject = scenarioData.scenario.queryObject;
            this.getData();
        }, 200);
       
    }

    /**
     * Metodo di cancellazione di uno scenario
     */
    public async deleteScenario(scenario: ScenariData): Promise<void> { 
        confirmationDeleteScenario.title = 'Eliminare lo scenario ' + scenario.nome + '?';
        const confirmation = this._fuseConfirmationService.open(confirmationDeleteScenario)
        confirmation.afterClosed().subscribe( async (result) => {
            if (result !== 'confirmed') return

            this.isLoading = true;
            await firstValueFrom(this._scenariService.delete(scenario.id));
            this.resetFilters();
            this.loadScenari();
        })
       
    }

    /**
     * Metodo di salvataggio scenario
     */
    public async saveScenario(nome: string): Promise<void> {
        // Recupero lo scenario attualo
        const state = this._configService.getTableState(this.tableKey);
        await firstValueFrom(this._scenariService.save({ nome: nome, tabella: this.tableKey, scenario: state }));
        confirmationOptions.title = 'Congratulazioni!'
        confirmationOptions.message = 'Scenario Salvato con Successo!'
        this._fuseConfirmationService.open(confirmationOptions)
        // Ricarico gli scenari
        this.loadScenari();
    }

    /**
     * Metodo di reset tabella
     */
    public resetTabella(key) {
        this._configService.clearTableState(key);
        this.filters = [];
        this.columns = [];
        this.queryObject = [];
        this.initTableData();
        this.getData();
    }

    /**
     * Get dell'autoresize delle colonne
     * @param column 
     * @returns 
     */
    public getAutoresize(column) {
        return column.canAutoResize;
    }

    /**
     * Get del isAzioni delle colonne
     * @param column 
     * @returns 
     */
    public isAzioni(column) {
        return (column.name === 'azioni') ? true : false;
    }

    /**
     * Get del isCheckbox delle colonne
     * @param column 
     * @returns 
     */
    public isCheckbox(column) {
        return (column.name === '_checkbox') ? true : false;
    }

    /**
     * Hendler per la select in tabella
     * @param param0 
     */
    public onSelect({selected}) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    /**
     * Metodo di ordinamento
     * @param event 
     */
    public sortData(event): void {
        this.pagination.currentPage = 0;
        this.queryObject.page = 1;
        this.queryObject.orderBy = [ event.column.name, event.newValue ];
        this.getData();
    }

    /**
     * Metodo di paginazione
     * @param event 
     */
    public pageData(event): void {
        this.queryObject.page = event.offset + 1;
        this.queryObject.limit = event.limit;
        this.getData();
    }

    /**
     * Metodo di recupero dei dati
     */
    public async getData(): Promise<void> {
        Object.keys(this.searchInputs).forEach((searchKey) => {
            if (this.searchInputs[searchKey]) {
                this.queryObject[searchKey] = this.searchInputs[searchKey]
            }
        });

        const queryString = qs.stringify(this.queryObject)
        
        const data = await firstValueFrom(this._httpClient.get<{ items: any[]; pagination: Pagination }>(environment.baseUrl + this.remoteUrl + queryString))
        this.dataSource = data.items;
        this.pagination = { ...this.pagination, ...data.pagination };
        this.isLoading = false;
        this._changeDetectorRef.markForCheck()

    }

    /**
     * Handle delle azioni su riga
     * @param data 
     * @param action 
     */
    public rowActionClick(data: any, action: string) {
        switch (action) {
            case 'delete':
                this.delete(data)
            break;
            case 'edit':
                this.modalService.open({
                    title: this.title,
                    id: this.frontRoute + '_' + data.id,
                    dynamicComponent: this.targetComponent,
                    bind: {
                        child: true,
                        id: data.id,
                        close: () => {
                            this.modalService.close(this.frontRoute + '_' + data.id);
                            this.getData();
                        }
                    },
                } as ModalComponentData)
            break;
        }
    }

    /**
     * Handle delle azioni dropdown su riga
     * @param data 
     * @param action 
     */
    public dropDownActionClick(event) {
        this.modalService.open({
            title: event.action.label,
            id: event.action.name,
            dynamicComponent: (new ActionComponentMap(event.action.target)).getComponent(),
            bind: {
                row: event.row,
                close: () => {
                    this.modalService.close(event.action.name);
                    this.getData();
                }
            },
            size: '2xl'
        } as ModalComponentData)
    }

    /**
     * Hendler delle Main Acions
     * @param action 
     */
    public mainActionEvent(action) {
        switch (action) {
            case 'create':
                this.modalService.open({
                    title: this.title,
                    id: this.frontRoute + '_new',
                    dynamicComponent: this.targetComponent,
                    bind: {
                        child: true,
                        close: () => {
                            this.modalService.close(this.frontRoute + '_new');
                            this.getData();
                        }
                    },
                } as ModalComponentData)
            break;
        }
    }

     /**
     * Metodo di wrapper dei valori
     */
     public getValues(row, value): any {
        return _.get(row, value)
    }

    /**
     * Metodo di filtraggio tabella
     * @param event 
     * @param field 
     */
     public filterTable(): void {
        this.isLoading = true
        this.getData()
    }

    /**
     * Metodo di reset dei filtri
     */
    public resetFilters(): void {
        this.searchInputs = {};
        this.pagination = new Pagination();
        this.queryObject = {
            page: this.pagination.currentPage + 1,
            limit: this.pagination.limit,
            orderBy: [ 'id', 'desc']
        };
        this.getData()
    }

     /**
     * Metodo di cancellazione
     * @param modello 
     */
     delete(modello: any): void {
        const confirmation = this._fuseConfirmationService.open(confirmationDeleteOptions)
        confirmation.afterClosed().subscribe((result) => {
            if (result !== 'confirmed') return

            this._httpClient.delete<TableData>(environment.baseUrl + this.editUrl + '/' + modello.id).subscribe((response) => {
                confirmationOptions.title = 'Congratulazioni!'
                confirmationOptions.message = 'Record eliminato con Successo!'
                this._fuseConfirmationService.open(confirmationOptions)
                this.getData();
            })
        })
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null)
        this._unsubscribeAll.complete()
    }

}
