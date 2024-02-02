import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { firstValueFrom, takeUntil } from 'rxjs'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { FuseConfirmationService } from '@fuse/services/confirmation'
import { MowConfigService } from 'app/core/config/MowConfigService'
import { AppConfig } from 'app/core/config/app.config'
import { Location } from '@angular/common'
import { BaseFormComponent } from 'app/shared/base-form.component'
import { UserService } from '../user.service'
import { UserData } from '../user.types'
import { RoleService } from '../../role/role.service'
import { PermissionsService } from 'app/shared/services/permissions.service'

@Component({
    selector: 'user-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent extends BaseFormComponent implements OnInit, OnDestroy {
    /**
     * Constructor
     */
    constructor(
        protected _router: Router,
        protected _userService: UserService,
        protected _roleService: RoleService,
        protected _permissionsService: PermissionsService,
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _fuseConfirmationService: FuseConfirmationService,
        protected _configService: MowConfigService,
        protected location: Location,
        protected route: ActivatedRoute
    ) {
        super(location, _fuseConfirmationService, _router, _changeDetectorRef)
        this._service = _userService
        this.baseUrl = '/users'
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
            const data = await firstValueFrom(this._userService.getById(this.id ? this.id : this.route.snapshot.paramMap.get('id')))
            this.item = new UserData(data)
        } else {
            this.item = new UserData()
        }
        // Costruisco la form
        this.buildForm()
    }

    /**
     * Metodo di build della form
     */
    public async buildForm(): Promise<void> {
        this.form = new FormGroup({
            name: new FormControl(this.item.name, [Validators.required]),
            email: new FormControl(this.item.email, [Validators.required, Validators.email]),
            role_id: new FormControl(this.item.role_id, [Validators.required]),
            permissions: new FormControl(this.item.permissions, []),
            active: new FormControl(this.item.active, [Validators.required]),
        })
        this.isLoading = false

        // Mark for check
        this._changeDetectorRef.markForCheck()
    }
}
