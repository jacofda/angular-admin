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
    ViewEncapsulation,
} from '@angular/core'
import { filter, Observable, of, Subject, takeUntil, interval, timer, map, takeWhile, finalize } from 'rxjs'
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion'
import { fuseAnimations } from '@fuse/animations'
import { FuseUtilsService } from '@fuse/services/utils/utils.service'
import { errorOptions } from 'app/shared/confirmations/popoup'
import { FuseConfirmationService } from '@fuse/services/confirmation'

@Component({
    selector: 'mass-actions-table',
    templateUrl: './massaction.component.html',
    styleUrls: ['./massaction.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    animations: fuseAnimations,
    exportAs: 'mass-actionsTable',
})
export class MassActionsTableComponent implements OnInit, OnDestroy {
   
    public currentMassActions: Array<any> = [];
    @Output() readonly rowMassActionClick: EventEmitter<any> = new EventEmitter<any>()

    @Input() massActions: Array<any> = []
    @Input() selected: Array<any> = [];
    @Input() totalRecords: number = 0;

    private _unsubscribeAll: Subject<any> = new Subject<any>()

    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _fuseConfirmationService: FuseConfirmationService,
    ) {}
    /**
     * On init
     */
    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.massActions?.currentValue) {
            this.currentMassActions =  changes.massActions?.currentValue?.filter( item => {
                return true;
            })
            this._changeDetectorRef.markForCheck()
        }
    }

    public click(option): void {
        if(this.selected.length === 0) {
            errorOptions.title = 'Attenzione!';
            errorOptions.message = 'Nessuna riga selezionata!';
            this._fuseConfirmationService.open(errorOptions);
            return;
        }

        this.rowMassActionClick.emit({ selected: this.selected, action: option });
        this._changeDetectorRef.markForCheck()
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null)
        this._unsubscribeAll.complete()
    }

}
