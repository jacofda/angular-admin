import { ChangeDetectionStrategy, Component, OnInit, Output, ViewEncapsulation, EventEmitter, Input } from '@angular/core'
import { AbstractControl, FormControl, FormGroup } from '@angular/forms'
import { fuseAnimations } from '@fuse/animations'

@Component({
    selector: 'validation-errors',
    templateUrl: './validation-errors.component.html',
    styleUrls: ['./validation-errors.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    animations: fuseAnimations,
    exportAs: 'validation-errors',
})
export class ValidationErrorsComponent implements OnInit {
    @Input() form: any
    @Input() control: string

    constructor() {}
    /**
     * On init
     */
    ngOnInit(): void {}

    ngOnChanges(value) {
        // console.log(value, this.form.errors);
    }
}
