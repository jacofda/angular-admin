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
import { TeamService } from '../team.service'
import { TeamData } from '../team.types'
import { Select } from 'app/shared/types/select'

@Component({
    selector: 'team-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamDetailsComponent extends BaseFormComponent implements OnInit, OnDestroy {
    public selectGroup: Select = new Select(null, [
        { id: 'Project Manager / Customer Care' },
        { id: 'R&D / Development' },
        { id: 'Marketing' },
        { id: 'Financial' },
    ])

    public editorConfig = {
        plugins: 'emoticons',
        menubar: false,
        toolbar: 'emoticons',
    }

    /**
     * Constructor
     */
    constructor(
        protected _router: Router,
        protected _teamService: TeamService,
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _fuseConfirmationService: FuseConfirmationService,
        protected _configService: MowConfigService,
        protected location: Location,
        protected route: ActivatedRoute
    ) {
        super(location, _fuseConfirmationService, _router, _changeDetectorRef)
        this._service = _teamService
        this.baseUrl = '/teams'
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
            const data = await firstValueFrom(this._teamService.getById(this.id ? this.id : this.route.snapshot.paramMap.get('id')))
            this.item = new TeamData(data)
        } else {
            this.item = new TeamData()
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
            position: new FormControl(this.item.position, [Validators.required]),
            group: new FormControl(this.item.group, [Validators.required]),
            linkedIn: new FormControl(this.item.linkedIn, [Validators.required]),
            emoji: new FormControl(this.item.emoji, [Validators.required]),
            order: new FormControl(this.item.order, [Validators.required]),
            mainImage: new FormControl<string>(this.item.mainImage, [Validators.required]),
        })
        this.isLoading = false

        // Mark for check
        this._changeDetectorRef.markForCheck()
    }

    public setSelectedMainImage(event: Asset): void {
        event.assetableId = this.item.id
        event.assetableType = 'team'
        event.assetableField = 'mainImage'
        event.id = this.item.mainImage?.id
        this.form.get('mainImage').setValue(event)
    }
}
