import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { firstValueFrom, takeUntil } from 'rxjs'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { ActivatedRoute, Router } from '@angular/router'
import { FuseConfirmationService } from '@fuse/services/confirmation'
import { MowConfigService } from 'app/core/config/MowConfigService'
import { AppConfig } from 'app/core/config/app.config'
import { Location } from '@angular/common'
import { BaseFormComponent } from 'app/shared/base-form.component'
import { RoleService } from '../role.service'
import { RoleData } from '../role.types'

@Component({
    selector: 'role-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleDetailsComponent extends BaseFormComponent implements OnInit, OnDestroy {

      /**
     * Constructor
     */
    constructor(
        protected _router: Router,
        protected _roleService: RoleService,
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _fuseConfirmationService: FuseConfirmationService,
        protected _configService: MowConfigService,
        protected location: Location,
        protected route: ActivatedRoute,
    ) {
        super(location, _fuseConfirmationService, _router, _changeDetectorRef);
        this._service = _roleService;
        this.baseUrl = '/roles';
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
            const data = await firstValueFrom(this._roleService.getById(this.id ? this.id : this.route.snapshot.paramMap.get('id')));
            this.item = new RoleData(data);
        } else {
            this.item = new RoleData();
        }
        // Costruisco la form
        this.buildForm();
    }

     /**
     * Metodo di build della form
     */
    public async buildForm(): Promise<void> {
        this.form = new FormGroup({
            name: new FormControl(this.item.name, [Validators.required]),
            title: new FormControl(this.item.title, [Validators.required]),
            permissions: new FormControl(this.item.permissions, []),
        })
        this.isLoading = false;

        // Mark for check
        this._changeDetectorRef.markForCheck()
    }
}
