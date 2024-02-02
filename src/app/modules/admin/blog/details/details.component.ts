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
import { BlogService } from '../blog.service'
import { BlogData } from '../blog.types'

@Component({
    selector: 'blog-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetailsComponent extends BaseFormComponent implements OnInit, OnDestroy {
    /**
     * Constructor
     */
    constructor(
        protected _router: Router,
        protected _blogService: BlogService,
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _fuseConfirmationService: FuseConfirmationService,
        protected _configService: MowConfigService,
        protected location: Location,
        protected route: ActivatedRoute
    ) {
        super(location, _fuseConfirmationService, _router, _changeDetectorRef)
        this._service = _blogService
        this.baseUrl = '/blogs'
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
            const data = await firstValueFrom(this._blogService.getById(this.id ? this.id : this.route.snapshot.paramMap.get('id')))
            this.item = new BlogData(data)
        } else {
            this.item = new BlogData()
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
            body: new FormControl(this.item.body, [Validators.required]),
            published_at: new FormControl(this.item.published_at, [Validators.required]),
            mainImage: new FormControl<string>(this.item.mainImage, [Validators.required]),
        })
        this.isLoading = false

        // Mark for check
        this._changeDetectorRef.markForCheck()
    }

    public setSelectedMainImage(event: Asset): void {
        event.assetableId = this.item.id
        event.assetableType = 'blog'
        event.assetableField = 'mainImage'
        event.id = this.item.mainImage?.id
        this.form.get('mainImage').setValue(event)
    }
}
