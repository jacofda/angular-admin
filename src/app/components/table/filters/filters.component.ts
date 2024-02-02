import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core'
import { filter, Observable, of, Subject, takeUntil, interval, timer, map, takeWhile, finalize } from 'rxjs'
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion'
import { fuseAnimations } from '@fuse/animations'
import { FuseUtilsService } from '@fuse/services/utils/utils.service'
import { MatDialog } from '@angular/material/dialog'
import { DialogModalComponent } from 'app/shared/dialog/dialog-modal.component'
import { ScenariData } from 'app/shared/types/scenariData'
import { MatMenu, MatMenuContent, MatMenuTrigger } from '@angular/material/menu'
import { Filter } from 'app/shared/types/filter'

@Component({
    selector: 'filters-table',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
    exportAs: 'filtersTable',
})
export class FiltersTableComponent implements OnInit, OnDestroy {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_dismissible: BooleanInput
    static ngAcceptInputType_dismissed: BooleanInput
    static ngAcceptInputType_showIcon: BooleanInput
    /* eslint-enable @typescript-eslint/naming-convention */
    @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

    @Input() filters: Array<Filter> = []
    @Input() scenari: Array<any> = []
    @Input() searchInputs: any = {};
    @Input() child: boolean = false;

    @Output() readonly search: EventEmitter<any> = new EventEmitter<any>()
    @Output() readonly reset: EventEmitter<any> = new EventEmitter<any>()
    @Output() readonly resetTabella: EventEmitter<any> = new EventEmitter<any>()
    @Output() readonly scenarioSave: EventEmitter<any> = new EventEmitter<any>()
    @Output() readonly scenarioLoad: EventEmitter<any> = new EventEmitter<any>()
    @Output() readonly scenarioDelete: EventEmitter<any> = new EventEmitter<any>()

    private _unsubscribeAll: Subject<any> = new Subject<any>()

    constructor(public dialog: MatDialog) {}

    /**
     * On init
     */
    public ngOnInit(): void {
    
    }

    /**
     * Search Event
     */
    public searchClick() {
        this.search.emit();
    }

    /**
     * Reset Event
     */
    public resetFilters() {
        this.reset.emit();
    }

    /**
     * Metodo di reset local tabella
     */
    public resetTable() {
        this.resetTabella.emit();
    }

    /**
     * Metodo di caricamento scenario
     */
    public loadScenario(scenario: ScenariData) {
        this.scenarioLoad.emit(scenario);
    }

    /**
     * Metodo di cancellazione di uno scenario
     */
    public deleteScenario(event, scenario: ScenariData) {
        event.stopPropagation();
        this.menuTrigger.closeMenu();
        this.scenarioDelete.emit(scenario);
    }

    /**
     * Evento di salvataggio Scenario
     */
    public saveScenario() {
        const dialogRef = this.dialog.open(DialogModalComponent, {
            data: { input: '', domanda: 'Inserisci il titolo dello scenario' },
        });
    
        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.scenarioSave.emit(result);
            }
        });
          
    }

    /**
     * On destroy
     */
    public ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null)
        this._unsubscribeAll.complete()
    }

}
