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
import { DummyCaseService } from '../dummy_case.service'
import { DummyCaseData } from '../dummy_case.types'

@Component({
    selector: 'dummy-case-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DummyCaseDetailsComponent extends BaseFormComponent implements OnInit, OnDestroy {

      /**
     * Constructor
     */
    constructor(
        protected _router: Router,
        protected _dummyCaseService: DummyCaseService,
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _fuseConfirmationService: FuseConfirmationService,
        protected _configService: MowConfigService,
        protected location: Location,
        protected route: ActivatedRoute,
    ) {
        super(location, _fuseConfirmationService, _router, _changeDetectorRef);
        this._service = _dummyCaseService;
        this.baseUrl = '/dummies-case';
    }

    /**
     * On init
     */
    async ngOnInit(): Promise<void> {
        this.isLoading = true;
        this._configService.config$.pipe(takeUntil(this._unsubscribeAll)).subscribe((config: AppConfig) => {
            this.scheme = config.scheme
        })

        if((!this.child && !this.isCreate)|| (this.child && Boolean(this.id))) {
            const data = await firstValueFrom(this._dummyCaseService.getById(this.id ? this.id : this.route.snapshot.paramMap.get('id')));
            this.item = new DummyCaseData(data);
        } else {
            this.item = new DummyCaseData();
        }
        // Costruisco la form
        this.buildForm();
    }

     /**
     * Metodo di build della form
     */
    public async buildForm(): Promise<void> {
        this.form = new FormGroup({
            nome: new FormControl(this.item.nome, [Validators.required]),
            mainImage: new FormControl<string>(this.item.mainImage, [Validators.required]),
        })
        this.isLoading = false;

        // Mark for check
        this._changeDetectorRef.markForCheck()
    }
}
