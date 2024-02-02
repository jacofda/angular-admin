import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { AsyncSubject, Subject, firstValueFrom, takeUntil } from 'rxjs'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { ActivatedRoute, Router } from '@angular/router'
import { FuseConfirmationService } from '@fuse/services/confirmation'
import { MowConfigService } from 'app/core/config/MowConfigService'
import { AppConfig } from 'app/core/config/app.config'
import { Location } from '@angular/common'
import { BaseFormComponent } from 'app/shared/base-form.component'
import { Asset } from 'app/shared/types/asset'
import { CasestudyService } from '../casestudy.service'
import { CasestudyData } from '../casestudy.types'
import { ModalService } from 'app/components/modal'
import { set } from 'lodash'
import { ClientService } from '../../client/client.service'
import { CategoryService } from '../../category/category.service'

@Component({
    selector: 'casestudy-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasestudyDetailsComponent extends BaseFormComponent implements OnInit, OnDestroy {
    public clientId: number | null = null

    /**
     * Constructor
     */
    constructor(
        protected _router: Router,
        protected _casestudyService: CasestudyService,
        protected _clientService: ClientService,
        protected _categoryService: CategoryService,
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _fuseConfirmationService: FuseConfirmationService,
        protected _configService: MowConfigService,
        protected _modalService: ModalService,
        protected location: Location,
        protected route: ActivatedRoute
    ) {
        super(location, _fuseConfirmationService, _router, _changeDetectorRef)
        this._service = _casestudyService
        this.baseUrl = '/case-studies'
    }

    /**
     * On init
     */
    async ngOnInit(): Promise<void> {
        this.isLoading = true

        // const client = (await firstValueFrom(this._clientService.clients$)) as any

        this._configService.config$.pipe(takeUntil(this._unsubscribeAll)).subscribe((config: AppConfig) => {
            this.scheme = config.scheme
        })

        if ((!this.child && !this.isCreate) || (this.child && Boolean(this.id))) {
            const data = await firstValueFrom(this._casestudyService.getById(this.id ? this.id : this.route.snapshot.paramMap.get('id')))
            this.item = new CasestudyData(data)
        } else {
            this.item = new CasestudyData()
        }
        // Costruisco la form
        this.buildForm()
    }

    /**
     * Metodo di build della form
     */
    public async buildForm(): Promise<void> {
        this.form = new FormGroup({
            titolo: new FormControl(this.item.titolo, [Validators.required]),
            abstract: new FormControl(this.item.abstract, [Validators.required]),
            body: new FormControl(this.item.body),
            client_id: new FormControl(this.item.client_id, [Validators.required]),
            category_id: new FormControl(this.item.category_id, [Validators.required]),
            mainImage: new FormControl<string>(this.item.mainImage, [Validators.required]),
        })
        this.isLoading = false

        // Mark for check
        this._changeDetectorRef.markForCheck()
    }

    public setSelectedMainImage(event: Asset): void {
        event.assetableId = this.item.id
        event.assetableType = 'casestudy'
        event.assetableField = 'mainImage'
        event.id = this.item.mainImage?.id
        this.form.get('mainImage').setValue(event)
    }
}
