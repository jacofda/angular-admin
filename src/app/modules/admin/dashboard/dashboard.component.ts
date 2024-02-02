import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { ModalComponent, ModalService } from 'app/components/modal'
import { MowConfigService } from 'app/core/config/MowConfigService'
import { AppConfig } from 'app/core/config/app.config'
import { Observable, Subject, firstValueFrom, takeUntil } from 'rxjs'
import { DashboardService } from './dashboard.service'
import { User } from 'app/core/user/user.types'
import { UserService } from 'app/core/user/user.service'

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
    public modals$!: Observable<ModalComponent[]>

    public scheme: string = 'light'
    private _unsubscribeAll: Subject<any> = new Subject<any>()
    public _counts = null
    public isLoading: boolean = false
    public user: User

    constructor(
        public modalService: ModalService,
        private _userService: UserService,
        private _configService: MowConfigService,
        private _dashboardService: DashboardService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    async ngOnInit(): Promise<void> {
        this.isLoading = true
        this._configService.config$.pipe(takeUntil(this._unsubscribeAll)).subscribe((config: AppConfig) => {
            this.scheme = config.scheme
        })
        this._counts = await firstValueFrom(this._dashboardService.getCount())

        this.isLoading = false
        this._changeDetectorRef.markForCheck()

        // Subscribe to the user service
        this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe((user: User) => {
            this.user = user
        })
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null)
        this._unsubscribeAll.complete()
    }
}
