import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MatDrawer } from '@angular/material/sidenav'
import { Subject, firstValueFrom, takeUntil } from 'rxjs'
import { FuseMediaWatcherService } from '@fuse/services/media-watcher'
import { FileManagerService } from 'app/modules/apps/file-manager/file-manager.service'
import { ImageSize, Item, Items } from 'app/modules/apps/file-manager/file-manager.types'
import { HttpClient } from '@angular/common/http'
import { environment } from 'environments/environment'
import { UploadComponent } from 'app/components/upload'
import { ModalService } from 'app/components/modal'
import { ModalComponentData } from 'app/components/modal/modal.types'

@Component({
    selector: 'file-manager-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileManagerListComponent implements OnInit, OnDestroy {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer
    public drawerMode: 'side' | 'over'
    public currentFolder: string = 'public/'
    public parentFolder: string
    public items: Items
    public loading: boolean
    private _unsubscribeAll: Subject<any> = new Subject<any>()
    protected clickedFolder: string
    protected currentSelected: any

    /**
     * Constructor
     */
    constructor(
        protected _httpClient: HttpClient,
        private _changeDetectorRef: ChangeDetectorRef,
        private _modalService: ModalService,
        private _fileManagerService: FileManagerService,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {
        this.clickedFolder = this.currentFolder
        this.loadData()
        // Subscribe to media query change
        this._fuseMediaWatcherService
            .onMediaQueryChange$('(min-width: 1440px)')
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((state) => {
                // Calculate the drawer mode
                this.drawerMode = state.matches ? 'side' : 'over'

                // Mark for check
                this._changeDetectorRef.markForCheck()
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

    /**
     * Metodo di gestione dell'evento del child che non 'funziona'
     *
     * */
    handleChildEvent($event) {
        console.log($event)
    }

    /**
     * Metodo di caricamento dei dati
     */
    public async loadData(folderId: string = undefined) {
        this.loading = true
        this.clickedFolder = folderId
        // preparo il percorso per la navigazione delle cartelle
        this.parentFolder = undefined
        if (folderId && folderId !== this.currentFolder) {
            this.parentFolder = folderId.split('/').slice(0, -2).join('/') + '/'
        }

        // carico i dati usando il percorso di default di S3 (public/) in questo caso
        this.items = await firstValueFrom(
            this._httpClient.get<Items>(environment.baseUrl + 'bucket?folderId=' + (folderId || this.currentFolder))
        )
        this.loading = false
        this._changeDetectorRef.markForCheck()
    }

    /**
     * On backdrop clicked
     */
    onBackdropClicked(): void {
        // Go back to the list
        this.currentSelected = null

        // Mark for check
        this._changeDetectorRef.markForCheck()
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
                prefix: this.clickedFolder || this.currentFolder,
                multiple: true,
                close: (event) => {
                    this.loadData()
                    this._changeDetectorRef.markForCheck()
                    this._modalService.close('upload_file')
                },
            },
        } as ModalComponentData)
    }

    /**
     * Metodo apertura dettaglio
     * @param file
     */
    public openDetail(file) {
        this._fileManagerService.getItemById(file.path).subscribe((res) => {
            this.currentSelected = res
            this._changeDetectorRef.markForCheck()
        })
    }

    /**
     * Metodon chiusura dettaglio
     */
    public closeDetail() {
        this.currentSelected = null
    }

    /**
     * genero il percorso del file della CDN
     */
    public getFilePath(file: Item, size: ImageSize = 256): string {
        return this._fileManagerService.generateFilePath(file, size)
    }

    /**
     * get S3 key
     */
    public getKey(file: Item): string {
        return file.name.split('/').slice(-1).pop()
    }

    /**
     * get S3 key
     */
    public getFolderName(folder): string {
        return folder.replace(this.currentFolder, '').replace('/', '')
    }

    /**
     * controllo che il file is un'immagine
     */
    public isImage(file: Item): boolean {
        return this._fileManagerService.fileIsAnImage(file)
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
