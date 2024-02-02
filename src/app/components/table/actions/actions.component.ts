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

@Component({
    selector: 'actions-table',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    animations: fuseAnimations,
    exportAs: 'actionsTable',
})
export class ActionsTableComponent implements OnInit, OnDestroy {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_dismissible: BooleanInput
    static ngAcceptInputType_dismissed: BooleanInput
    static ngAcceptInputType_showIcon: BooleanInput
    /* eslint-enable @typescript-eslint/naming-convention */

    public currentDropDownActions: Array<any> = [];

    @Input() rowActions: Array<any> = []
    @Input() rowDropDownActions: Array<any> = []
    @Input() row: any;

    @Output() readonly rowActionClick: EventEmitter<any> = new EventEmitter<any>()
    @Output() readonly rowDropdownActionClick: EventEmitter<any> = new EventEmitter<any>()

    private _unsubscribeAll: Subject<any> = new Subject<any>()

    constructor(protected _changeDetectorRef: ChangeDetectorRef) {}
    /**
     * On init
     */
    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.rowDropDownActions) {
            this.currentDropDownActions =  changes.rowDropDownActions?.currentValue?.filter( item => {
                return item.condition ? this.row[item.condition] : true;
            })
            this._changeDetectorRef.markForCheck()
        }
    }

    dropDownActionClick(option) {
        this.rowDropdownActionClick.emit({ row: this.row, action: option });
        this._changeDetectorRef.markForCheck()
    }

    rowClick($event, name) {
        this.rowActionClick.emit({ row: $event, action: name });
    }

    getCondition(row, option) {
        return option.condition ? row[option.condition] : true;
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
