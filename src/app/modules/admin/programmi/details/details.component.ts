import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { Subscription, firstValueFrom, takeUntil } from 'rxjs'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { FuseConfirmationService } from '@fuse/services/confirmation'
import { MowConfigService } from 'app/core/config/MowConfigService'
import { AppConfig } from 'app/core/config/app.config'
import { Programmi } from '../programmi.types'
import { ProgrammiService } from '../programmi.service'
import { Select } from 'app/shared/types/select'
import { Location } from '@angular/common'
import { BaseFormComponent } from 'app/shared/base-form.component'
import { ModalService } from 'app/components/modal'

@Component({
    selector: 'programmi-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class ProgrammiDetailsComponent extends BaseFormComponent implements OnInit, OnDestroy {
    public select: Select = new Select()
    public nestForm: FormGroup

    public selectAttivo: Select = new Select(null, [
        { id: false, nome: 'No' },
        { id: true, nome: 'Sì' },
    ])

    public selectTarget: Select = new Select(null, [
        { id: '_blank', nome: 'Blank' },
        { id: '_self', nome: 'Self' },
        { id: '_parent', nome: 'Parent' },
        { id: '_top', nome: 'Top' },
    ])

    public selectTipi: Select = new Select(null, [
        { id: 'aside', nome: 'Aside' },
        { id: 'basic', nome: 'Basic' },
        { id: 'collapsable', nome: 'Collapsable' },
        { id: 'divider', nome: 'Divider' },
        { id: 'group', nome: 'Group' },
        { id: 'spacer', nome: 'Spacer' },
    ])

    public selectTemplates: Select = new Select(null, [
        { id: 'compact', nome: 'Compact' },
        { id: 'default', nome: 'Default' },
        { id: 'horizontal', nome: 'Horizontal' },
        { id: 'futiristic', nome: 'Futuristic' },
    ])

    protected _fileSubscription: Subscription

    /**
     * Constructor
     */
    constructor(
        protected _router: Router,
        protected _programmiService: ProgrammiService,
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _fuseConfirmationService: FuseConfirmationService,
        private _configService: MowConfigService,
        protected location: Location,
        protected route: ActivatedRoute,
        public modalService: ModalService
    ) {
        super(location, _fuseConfirmationService, _router, _changeDetectorRef)
        this._service = _programmiService
        this.baseUrl = '/programmi'
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
            const data = await firstValueFrom(this._programmiService.getById(this.id ? this.id : this.route.snapshot.paramMap.get('id')))
            this.item = new Programmi(data)
        } else {
            this.item = new Programmi()
        }
        // Costruisco la form
        this.buildForm()
    }

    /**
     * Metodo di build della form
     */
    public async buildForm(): Promise<void> {
        this.nestForm = new FormGroup({
          default: new FormControl(this.item.templates?.default, []),
          compact: new FormControl(this.item.templates?.compact, []),
          horizontal: new FormControl(this.item.templates?.horizontal, []),
          futuristic: new FormControl(this.item.templates?.futuristic, []),
        });
        this.form = new FormGroup({
            title: new FormControl(this.item.title, [Validators.required]),
            subtitle: new FormControl(this.item.subtitle, []),
            tooltip: new FormControl(this.item.tooltip, []),
            link: new FormControl(this.item.link, []),
            queryParams: new FormArray([]),
            externalLink: new FormControl(this.item.externalLink, []),
            target: new FormControl(this.item.target, []),
            exactMatch: new FormControl(this.item.exactMatch, []),
            classes: new FormGroup({
                title: new FormControl(this.item.classes?.title, []),
                subtitle: new FormControl(this.item.classes?.subtitle, []),
                icon: new FormControl(this.item.classes?.icon, []),
                wrapper: new FormControl(this.item.classes?.wrapper, []),
            }),
            icon: new FormControl(this.item.icon, []),
            badge: new FormGroup({
                title: new FormControl(this.item.badge?.title, []),
                classes: new FormControl(this.item.badge?.classes, []),
            }),
            meta: new FormControl(this.item.meta, []),

            permission: new FormControl(this.item.permission, []),
            order: new FormControl(this.item.order, [Validators.required]),
            parent_id: new FormControl(this.item.parent_id, []),
            templates: this.nestForm,
            active: new FormControl(this.item.active, [Validators.required]),
        })

        this.item.queryParams?.forEach(({key, value}: {key: string, value: any}) => {
            this.queryParams.push(
                new FormGroup({
                    key: new FormControl(key, [Validators.required]),
                    value: new FormControl(value, [Validators.required]),
                })
            )
        })

        this.isLoading = false

        // Mark for check
        this._changeDetectorRef.markForCheck()
    }

    get queryParams(): FormArray {
        return this.form.get('queryParams') as FormArray
    }

    newQueryParams(): FormGroup {
        return new FormGroup({
            key: new FormControl('', [Validators.required]),
            value: new FormControl('', [Validators.required]),
        })
    }

    public addParam() {
        this.queryParams.push(this.newQueryParams())
    }

    public removeParam(index: number) {
        this.queryParams.removeAt(index)
    }
}
