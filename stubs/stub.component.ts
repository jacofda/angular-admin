import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core'

@Component({
    selector: 'dummy-case',
    templateUrl: './dummy_case.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DummyCaseComponent {
    /**
     * Constructor
     */
    constructor() {}
}
