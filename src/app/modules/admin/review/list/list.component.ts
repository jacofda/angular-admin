import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { fuseAnimations } from '@fuse/animations'
import { FuseConfirmationService } from '@fuse/services/confirmation'
import { MowAlertService } from 'app/components/alert/alert.service'
import { BaseListComponent } from 'app/shared/base-list.component'
import { ActivatedRoute, Router } from '@angular/router'
import { ModalService } from 'app/components/modal'
import { MowConfigService } from 'app/core/config/MowConfigService'
import { ScenariService } from 'app/shared/services/scenari.service'
import { ReviewService } from '../review.service'

@Component({
    selector: 'review-list',
    templateUrl: '../../../../shared/base-list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
})
export class ReviewListComponent extends BaseListComponent implements OnInit, OnDestroy {
    /**
     * Constructor
     */
    constructor(
        protected _reviewService: ReviewService,
        protected _fuseConfirmationService: FuseConfirmationService,
        protected _mowAlertService: MowAlertService,
        protected _changeDetectorRef: ChangeDetectorRef,
        protected router: Router,
        protected route: ActivatedRoute,
        protected modalService: ModalService,
        protected _configService: MowConfigService,
        protected _scenariService: ScenariService
    ) {
        super(_fuseConfirmationService, _mowAlertService, _changeDetectorRef, router, route, modalService, _configService, _scenariService)
        this.baseService = _reviewService
        this.titolo = 'Review'
        this.tableKey = 'master_review_table'
    }

    /**
     * On init
     */
    async ngOnInit(): Promise<void> {
        await this.init()
        await this.getData()
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this.unsubscribeAll()
    }
}
