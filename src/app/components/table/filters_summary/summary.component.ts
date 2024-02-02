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
import { fuseAnimations } from '@fuse/animations'
import { Filter } from 'app/shared/types/filter'

@Component({
    selector: 'summary-filter-table',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    animations: fuseAnimations,
    exportAs: 'summary-filter-table',
})
export class SummaryFilterTableComponent implements OnInit {
    protected activeFilters: Array<any> = []

    @Input() filters: Filter[] = []
    @Input() searchInputs: any = {}
    @Output() readonly removeFilter: EventEmitter<any> = new EventEmitter<any>()

    constructor(protected _changeDetectorRef: ChangeDetectorRef) {}
    /**
     * On init
     */
    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges) {
        this._changeDetectorRef.markForCheck()
        this.getFilterActive()
    }

    getFilterActive() {
        this.activeFilters = []
        Object.keys(this.searchInputs).forEach((item) => {
            const filtro = this.filters.find((itemf) => {
                return itemf.name === item
            })

            filtro ? this.activeFilters.push({
                label: filtro.label,
                key: filtro.name,
                value: this._getValore(filtro, this.searchInputs[item])
            }) : null
        })
    }

    /**
     * Evento di rimozione filtri
     * @param option
     */
    public removeFilterEvent(option) {
        this.removeFilter.emit(option)
    }

    private _getValore(filtro: Filter, value: any) {
        if (filtro.type === 'select') {
            const item = filtro.options.find((item) => {
                return item[filtro.track_value || 'id'] === value
            })
            return item[filtro.track_label || 'name']
        }

        return value
    }
}
