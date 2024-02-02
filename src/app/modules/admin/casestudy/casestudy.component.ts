import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core'

@Component({
    selector: 'casestudy',
    templateUrl: './casestudy.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasestudyComponent {
    /**
     * Constructor
     */
    constructor() {}
}
