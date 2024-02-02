import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core'

@Component({
    selector: 'programmi',
    templateUrl: './programmi.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgrammiComponent {
    /**
     * Constructor
     */
    constructor() {}
}
