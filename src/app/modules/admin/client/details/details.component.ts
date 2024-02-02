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
import { ClientService } from '../client.service'
import { ClientData } from '../client.types'
import { Select } from 'app/shared/types/select'

@Component({
    selector: 'client-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDetailsComponent extends BaseFormComponent implements OnInit, OnDestroy {
    public selectIsInSlide: Select = new Select(null, [
        { id: false, nome: 'No' },
        { id: true, nome: 'Sì' },
    ])

    /**
     * Constructor
     */
    constructor(
        protected _router: Router,
        protected _clientService: ClientService,
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _fuseConfirmationService: FuseConfirmationService,
        protected _configService: MowConfigService,
        protected location: Location,
        protected route: ActivatedRoute
    ) {
        super(location, _fuseConfirmationService, _router, _changeDetectorRef)
        this._service = _clientService
        this.baseUrl = '/clients'
    }

    /**
     * On init
     */
    async ngOnInit(): Promise<void> {
        this.isLoading = true
        this._configService.config$.pipe(takeUntil(this._unsubscribeAll)).subscribe((config: AppConfig) => {
            this.scheme = config.scheme
        })

        if ((!this.child && !this.isCreate) || (this.child && Boolean(this.id))) {
            const data = await firstValueFrom(this._clientService.getById(this.id ? this.id : this.route.snapshot.paramMap.get('id')))
            this.item = new ClientData(data)
        } else {
            this.item = new ClientData()
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
            website: new FormControl<string>(this.item.website, [Validators.required]),
            isInSlide: new FormControl<boolean>(this.item.isInSlide, [Validators.required]),
            mainImage: new FormControl<string>(this.item.mainImage, [Validators.required]),
        })

        this.isLoading = false

        // Mark for check
        this._changeDetectorRef.markForCheck()
    }

    public setSelectedMainImage(event: Asset): void {
        event.assetableId = this.item.id
        event.assetableType = 'client'
        event.assetableField = 'mainImage'
        event.id = this.item.mainImage?.id
        this.form.get('mainImage').setValue(event)
    }
}
