import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    Output,
    ViewEncapsulation,
    EventEmitter,
    Input
} from '@angular/core'
import { fuseAnimations } from '@fuse/animations'

@Component({
    selector: 'form-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    animations: fuseAnimations,
    exportAs: 'navigationFotm',
})
export class FormNavigationComponent implements OnInit {

    @Input() readonly isChild: boolean = false
    @Output() readonly goBack: EventEmitter<any> = new EventEmitter<any>()
    @Output() readonly submit: EventEmitter<any> = new EventEmitter<any>()
    @Output() readonly salvacontinua: EventEmitter<any> = new EventEmitter<any>()

    constructor() {}
    /**
     * On init
     */
    ngOnInit(): void {
    }

    public goToBack() {
        this.goBack.emit();
    }

    public submitEvent() {
        this.submit.emit();
    }

    public salvaEContinua() {
        this.salvacontinua.emit();
    }
   
}
