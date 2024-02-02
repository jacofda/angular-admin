import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    Output,
    ViewEncapsulation,
    EventEmitter,
    Input,
    ChangeDetectorRef
} from '@angular/core'
import { fuseAnimations } from '@fuse/animations'
import { Observable, firstValueFrom } from 'rxjs';
import { FormSelectService } from './select.service';

@Component({
    selector: 'form-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    animations: fuseAnimations,
    exportAs: 'form-select',
})
export class FormSelectComponent implements OnInit {

    protected currentItems: Array<any> = [];

    @Input() items: Array<any> = [];
    @Input() formName: string;
    @Input() formGroup: any;
    @Input() bindLabel: string;
    @Input() bindValue: string;
    @Input() appearance: string;
    @Input() customclass: string;
    @Input() loading: boolean = false;
    @Input() multiple: boolean = false;
    @Input() searchable: boolean = true;
    @Input() readonly: boolean = false;
    @Input() searchFn: Observable<any>;
    @Input() preload: boolean = false;

    @Output() readonly search: EventEmitter<any> = new EventEmitter<any>()
    @Output() readonly change: EventEmitter<any> = new EventEmitter<any>()

    constructor(
        protected _formSelectService: FormSelectService,
        protected _changeDetectorRef: ChangeDetectorRef,
    ) {}
    /**
     * On init
     */
    async ngOnInit(): Promise<void> {
        this.currentItems = this.items;
        this._changeDetectorRef.markForCheck()

        if(this.preload && this.searchFn) {
            this.currentItems = await firstValueFrom(this.searchFn);
            this._changeDetectorRef.markForCheck()
        }
    }

    public searchValue(event) {
        this.search.emit(event.term);
    }

    public changeValue(event) {
        this.change.emit(event)
    }

   
}
