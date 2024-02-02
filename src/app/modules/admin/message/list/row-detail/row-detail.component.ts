import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { fuseAnimations } from '@fuse/animations'
import { FuseConfirmationService } from '@fuse/services/confirmation'
import { MowAlertService } from 'app/components/alert/alert.service'
import { BaseListComponent } from 'app/shared/base-list.component'
import { ActivatedRoute, Router } from '@angular/router'
import { ModalService } from 'app/components/modal'
import { MowConfigService } from 'app/core/config/MowConfigService'
import { ScenariService } from 'app/shared/services/scenari.service'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'row-detail-messaggi',
    templateUrl: './row-detail.component.html',
    styleUrls: ['./row-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
    standalone: true,
    imports: [CommonModule],
})
export class RowDetailMessaggiComponent implements OnInit {
    @Input() rowData: any

    /**
     * Constructor
     */
    constructor() {}

    /**
     * On init
     */
    async ngOnInit(): Promise<void> {}
}
