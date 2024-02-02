import { HttpClient } from '@angular/common/http'
import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    Output,
    ViewEncapsulation,
    EventEmitter,
    Input,
    ChangeDetectorRef,
} from '@angular/core'
import { MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions } from '@angular/material/checkbox'
import { fuseAnimations } from '@fuse/animations'
import { ModalService } from 'app/components/modal'
import { ModalComponentData } from 'app/components/modal/modal.types'
import { UploadComponent } from 'app/components/upload'
import { FileManagerService } from 'app/modules/apps/file-manager/file-manager.service'
import { ImageSize, Item, Items } from 'app/modules/apps/file-manager/file-manager.types'
import { environment } from 'environments/environment'
import { Observable, firstValueFrom } from 'rxjs'

@Component({
    selector: 'file-select',
    templateUrl: './file-select.component.html',
    styleUrls: ['./file-select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
    exportAs: 'file-select',
    providers: [{ provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions }],
})
export class FileSelectComponent implements OnInit {
    protected currentItems: Array<any> = []
    protected items: Items
    protected isLoading: boolean = false
    protected env = environment
    public parentFolder: string
    queryString: string = ''
    protected clickedFolder: string
    protected currentSelected: any
    protected multipleSelected: Array<any> = []

    @Input() close: Function
    @Input() multiple: boolean = false
    @Input() currentFolder: string = 'public/'
    @Input() documenti: boolean = false

    @Output() readonly search: EventEmitter<any> = new EventEmitter<any>()
    @Output() readonly change: EventEmitter<any> = new EventEmitter<any>()

    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _httpClient: HttpClient,
        protected _fileManagerService: FileManagerService,
        protected _modalService: ModalService
    ) {}
    /**
     * On init
     */
    async ngOnInit(): Promise<void> {
        this.isLoading = true
        this.loadData()
    }

    public updateQueryString() {
        this.loadData()
    }

    /**
     * Metodo di caricamento dei dati
     */
    public async loadData(folderId: string = this.currentFolder) {
        this.isLoading = true
        this.clickedFolder = folderId
        // preparo il percorso per la navigazione delle cartelle
        this.parentFolder = undefined
        if (folderId && folderId !== this.currentFolder) {
            this.parentFolder = folderId.split('/').slice(0, -2).join('/') + '/'
        }

        // carico i dati usando il percorso di default di S3 (public/) in questo caso
        this.items = await firstValueFrom(
            this._httpClient.get<Items>(
                environment.baseUrl + 'bucket?folderId=' + (folderId || this.currentFolder) + '&filename=' + this.queryString
            )
        )

        this.items.files = this.items.files
            .map((file) => {
                file.loading = false
                file.selected = false
                return file
            })
            .filter((file) => file.name.toLowerCase().indexOf(this.queryString.toLowerCase()) > -1)
        this.isLoading = false
        this._changeDetectorRef.markForCheck()
    }

    /**
     * Metodo di select del file
     * @param file
     */
    public selected(file) {
        file.originalName = file.name.split('/').pop()
        this.close(file)
    }

    public selectedSingle(event, file) {
        event.stopPropagation()
        file.selected = !file.selected
    }

    public someSelected(): boolean {
        return this.items.files.filter((file) => file.selected).length > 0
    }

    public selectSelected() {
        const selected = this.items.files.filter((file) => file.selected)
        this.close(selected)
    }

    /**
     * Metodo di cancellazione del file
     * @param event
     * @param file
     */
    public delete(event, file) {
        event.stopPropagation()
        file.loading = true
        this._fileManagerService.deleteFile(file.path).subscribe((response) => {
            this.loadData()
        })
    }

    /**
     * Metodo di upload del file
     */
    public upload() {
        this._modalService.open({
            title: 'Upload Files',
            id: 'upload_file',
            dynamicComponent: UploadComponent,
            bind: {
                multiple: true,
                prefix: this.clickedFolder,
                accept: this.documenti ? 'application/*' : 'image/*',
                close: (event) => {
                    this.loadData()
                    this._changeDetectorRef.markForCheck()
                    this._modalService.close('upload_file')
                },
            },
        } as ModalComponentData)
    }

    public isImage(file): boolean {
        return this._fileManagerService.fileIsAnImage(file)
    }

    /**
     * get S3 key
     */
    public getFolderName(folder): string {
        return folder.replace(this.currentFolder, '').replace('/', '')
    }

    /**
     * genero il percorso del file della CDN
     */
    public getFilePath(file: Item, size: ImageSize = 256): string {
        return this._fileManagerService.generateFilePath(file, size)
    }
}
