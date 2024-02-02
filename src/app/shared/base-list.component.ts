import { ChangeDetectorRef, Component, ViewChild } from '@angular/core'
import { FuseConfirmationService } from '@fuse/services/confirmation'
import { MowAlertService } from 'app/components/alert'
import { Filter } from './types/filter'
import { Column } from './types/column'
import { MainAction } from './types/actions/main'
import { RowAction } from './types/actions/row'
import { firstValueFrom, Subject, takeUntil } from 'rxjs'
import { confirmationDeleteOptions, confirmationDeleteScenario, confirmationOptions } from 'app/shared/confirmations/popoup'
import * as _ from 'lodash'
import { ActivatedRoute, Router } from '@angular/router'
import { ModalService } from 'app/components/modal'
import { ModalComponentData } from 'app/components/modal/modal.types'
import { ActionComponentMap } from './types/actions/map'
import { MowConfigService } from 'app/core/config/MowConfigService'
import { AppConfig } from 'app/core/config/app.config'
import { Pagination } from './types/pagination'
import { SelectionType } from '@swimlane/ngx-datatable'
import { MassAction } from './types/actions/mass_actions'
import { ScenariData } from './types/scenariData'
import { ScenariService } from './services/scenari.service'
import { BaseService } from './types/baseService'

@Component({
    selector: 'base-list',
    template: '',
})
export class BaseListComponent {
    @ViewChild('table') table: any

    protected titolo: string = ''
    protected tableKey: string
    protected baseService: BaseService<any, any>
    public isLoading: boolean = false
    public filters: Filter[] = []
    public columns: Column[] = []
    public mainAction: MainAction[]
    public massActions: MassAction[] = []
    public rowAction: RowAction[]
    public rowDropDownction: RowAction[] = []
    protected pagination = new Pagination()
    public queryObject: any = {
        page: this.pagination.currentPage + 1,
        limit: this.pagination.limit,
        orderBy: ['id', 'desc'],
    }
    public displayedColumns: string[] = []
    public dataSource: Array<any> = []
    public scheme: any
    public resultsLength: number = 0
    public isLoadingResults = false
    protected _debounceTimeout: any
    protected _unsubscribeAll: Subject<any> = new Subject<any>()
    protected selection: SelectionType
    protected selected: Array<string> = []
    protected scenari: Array<ScenariData> = []
    protected _table_messages = {
        // Message to show when array is presented
        // but contains no values
        emptyMessage:
            '<div class="flex justify-center mt-2"><b><i class="fa-thin fa-beer-mug-empty mr-3"></i></i>Nessun record da mostrare</b></div>',

        // Footer total message
        totalMessage: 'record totali',

        // Footer selected message
        selectedMessage: 'selezionati',
    }
    protected _currentDetailRow: any
    protected _rowDataComponent: any
    protected _lastRowOpened: any

    /**
     * Constructor
     */
    constructor(
        protected _fuseConfirmationService: FuseConfirmationService,
        protected _mowAlertService: MowAlertService,
        protected _changeDetectorRef: ChangeDetectorRef,
        protected router: Router,
        protected route: ActivatedRoute,
        protected modalService: ModalService,
        protected _configService: MowConfigService,
        protected _scenariService: ScenariService
    ) {
        this._configService.config$.pipe(takeUntil(this._unsubscribeAll)).subscribe((config: AppConfig) => {
            this.scheme = config.scheme

            if (this.scheme === 'auto') {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    this.scheme = 'dark'
                } else {
                    this.scheme = 'light'
                }
            }

            this._changeDetectorRef.markForCheck()
        })
        this.selection = SelectionType.checkbox
    }

    /**
     * Metodo di init del componente
     */
    async init(): Promise<void> {
        this.isLoadingResults = true

        try {
            const response = await firstValueFrom(this.baseService.getTableData())
            this.filters = response.filters
            this.columns = response.columns
            this.mainAction = response.mainAction
            this.rowAction = response.rowAction
            this.rowDropDownction = response.rowDropDownActions
            this.massActions = response.massActions
            this.displayedColumns = this.columns.map((column) => column.name)

            if (this.rowAction.length) {
                this.displayedColumns.push('Azioni')
            }
            // Recupero gli scenari
            this.loadScenari()

            // Se è presente uno state nel local storage lo carico
            this.loadTableState()
        } catch (error) {}
    }

    public loadScenari() {
        this._scenariService.getScenari(this.tableKey).subscribe((res) => {
            this.scenari = res
        })
    }

    /**
     * Metodo di load state tabella
     */
    public loadTableState() {
        const state = this._configService.getTableState(this.tableKey)
        if (state) {
            this.filters = state.filters
            this.columns = state.columns
            this.queryObject = state.queryObject
        }
        return state
    }

    /**
     * Metodo di salvataggio state tabella
     */
    public saveTable() {
        this._configService.saveTableState(this.tableKey, {
            key: this.tableKey,
            filters: this.filters,
            columns: this.columns,
            queryObject: this.queryObject,
        })
    }

    /**
     * Metodo di load di uno scenario
     */
    public async loadScenario(scenario: ScenariData): Promise<void> {
        this.isLoadingResults = true
        this.columns = []
        await setTimeout(async () => {
            const scenarioData = await firstValueFrom(this._scenariService.load(scenario.id))
            this.filters = scenarioData.scenario.filters
            this.columns = scenarioData.scenario.columns
            this.queryObject = scenarioData.scenario.queryObject
            this.getData()
        }, 200)
    }

    /**
     * Metodo di cancellazione di uno scenario
     */
    public async deleteScenario(scenario: ScenariData): Promise<void> {
        confirmationDeleteScenario.title = 'Eliminare lo scenario ' + scenario.nome + '?'
        const confirmation = this._fuseConfirmationService.open(confirmationDeleteScenario)
        confirmation.afterClosed().subscribe(async (result) => {
            if (result !== 'confirmed') return

            try {
                this.isLoadingResults = true
                await firstValueFrom(this._scenariService.delete(scenario.id))
                this.resetFilters()
                this.loadScenari()
            } catch (error) {}
        })
    }

    /**
     * Metodo di salvataggio scenario
     */
    public async saveScenario(nome: string): Promise<void> {
        try {
            // Recupero lo scenario attualo
            const state = this._configService.getTableState(this.tableKey)
            await firstValueFrom(this._scenariService.save({ nome: nome, tabella: this.tableKey, scenario: state }))
            confirmationOptions.title = 'Congratulazioni!'
            confirmationOptions.message = 'Scenario Salvato con Successo!'
            this._fuseConfirmationService.open(confirmationOptions)
            // Ricarico gli scenari
            this.loadScenari()
        } catch (error) {}
    }

    /**
     * Metodo di reset tabella
     */
    public resetTabella(key) {
        this._configService.clearTableState(key)
        this.filters = []
        this.columns = []
        this.queryObject = []
        this.pagination = new Pagination()
        this.init()
        this.getData()
    }

    /**
     * Get dell'autoresize delle colonne
     * @param column
     * @returns
     */
    public getAutoresize(column) {
        return column.canAutoResize
    }

    /**
     * Get dell'autoresize delle colonne
     * @param column
     * @returns
     */
    public isResizable(column) {
        return column.hasOwnProperty('resizeable') ? column.resizeable : true
    }

    /**
     * Get del isAzioni delle colonne
     * @param column
     * @returns
     */
    public isAzioni(column) {
        return column.name === 'azioni' ? true : false
    }

    /**
     * Get del isCheckbox delle colonne
     * @param column
     * @returns
     */
    public isCheckbox(column) {
        return column.name === '_checkbox' ? true : false
    }

    /**
     * Hendler per la select in tabella
     * @param param0
     */
    public onSelect({ selected }) {
        this.selected.splice(0, this.selected.length)
        this.selected.push(...selected)
    }

    /**
     * Metodo di aggiornamento delle actions
     */
    private refreshActions(): void {
        this.rowDropDownction = this.rowDropDownction ? [...this.rowDropDownction] : []
        this.rowAction = this.rowAction ? [...this.rowAction] : []
        this.queryObject = { ...this.queryObject }
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
                break
            case 'edit':
                this.router.navigate([String(data.id)], { relativeTo: this.route })
                break
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
            dynamicComponent: new ActionComponentMap(event.action.target).getComponent(),
            bind: {
                row: event.row,
                close: () => {
                    this.modalService.close(event.action.name)
                    this.getData()
                },
            },
            size: '2xl',
        } as ModalComponentData)
    }

    /**
     * Handle delle azioni di massa
     * @param data
     * @param action
     */
    public rowMassActionClick(event) {
        this.modalService.open({
            title: event.action.label,
            id: event.action.name,
            dynamicComponent: new ActionComponentMap(event.action.target).getComponent(),
            bind: {
                selected: event.selected,
                close: () => {
                    this.modalService.close(event.action.name)
                    this.getData()
                },
            },
            size: '2xl',
        } as ModalComponentData)
    }

    /**
     * Metodo di cancellazione
     * @param modello
     */
    public delete(modello: any): void {
        const confirmation = this._fuseConfirmationService.open(confirmationDeleteOptions)
        confirmation.afterClosed().subscribe((result) => {
            if (result !== 'confirmed') return

            this.baseService.delete(modello.id).subscribe((response) => {
                if (!response) return

                this.getData()
                confirmationOptions.title = 'Congratulazioni!'
                confirmationOptions.message = 'Eliminazione avvenuta con Successo!'
                this._fuseConfirmationService.open(confirmationOptions)
            })
        })
    }

    /**
     * Metodo di ordinamento
     * @param event
     */
    public sortData(event): void {
        this.pagination.currentPage = 0
        this.queryObject.page = 1
        this.queryObject.orderBy = [event.column.prop, event.newValue]
        this.getData()
    }

    /**
     * Metodo di paginazione
     */
    public pageData(event): void {
        this.queryObject.page = event.offset + 1
        this.queryObject.limit = event.limit
        this.getData()
    }

    /**
     * Metodo di recupero dei dati
     */
    public async getData(): Promise<void> {
        try {
            this.isLoadingResults = true
            this.selected = []

            const data = await firstValueFrom(this.baseService.list(this.queryObject))
            this.dataSource = data.items
            this.pagination = { ...this.pagination, ...data.pagination }
            this.isLoadingResults = false
            this.refreshActions()
            this.saveTable()
            this._changeDetectorRef.markForCheck()
        } catch (error) {}
    }

    /**
     * Metodo di filtraggio tabella
     * @param event
     * @param field
     */
    public filterTable(): void {
        this.isLoadingResults = true
        this.getData()
    }

    /**
     * Metodo di rimozione di un filtro
     * @param filter
     */
    public removeFilter(filter): void {
        delete this.queryObject[filter]
        this.getData()
    }

    /**
     * Metodo di reset dei filtri
     */
    public resetFilters(): void {
        this.pagination = new Pagination()
        this.queryObject = {
            page: this.pagination.currentPage + 1,
            limit: this.pagination.limit,
            orderBy: ['id', 'desc'],
        }
        this.getData()
    }

    /**
     * Metodo di unsubscribe
     */
    public unsubscribeAll(): void {
        this._unsubscribeAll.next(null)
        this._unsubscribeAll.complete()
    }

    /**
     * Metodo di wrapper dei valori
     */
    public getValues(row, value): any {
        return _.get(row, value)
    }

    public setPaginatorSize(size: number) {
        this.queryObject.limit = size
        this.pagination.limit = size
        this.pagination.currentPage = 0
        this.queryObject.page = 1
        this.getData()
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
     * Metodo per toggle del dettaglio riga
     * @param event
     */
    async toggleExpandRow(event) {
        // se l'evento è di tipo click
        if (event.type === 'click') {
            if (!this._lastRowOpened || (this._lastRowOpened && this._lastRowOpened.id !== event.row.id)) {
                this.isLoadingResults = true
                this.table.rowDetail.collapseAllRows()
                this._currentDetailRow = await firstValueFrom<any>(this.baseService.getById(event.row.id))
                this.table.rowDetail.toggleExpandRow(event.row)
                this._lastRowOpened = event.row
                this.isLoadingResults = false
            } else {
                this.table.rowDetail.toggleExpandRow(event.row)
                this._lastRowOpened = event.row
            }
            this._changeDetectorRef.markForCheck()
        }
    }

    onDetailToggle(event) {
        //console.log('Detail Toggled', event);
    }
}
