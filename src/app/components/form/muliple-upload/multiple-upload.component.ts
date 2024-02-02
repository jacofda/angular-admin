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
import { fuseAnimations } from '@fuse/animations'
import { ModalService } from 'app/components/modal'
import { ModalComponentData } from 'app/components/modal/modal.types'
import { UploadComponent } from 'app/components/upload'
import { FileManagerService } from 'app/modules/apps/file-manager/file-manager.service'
import { ImageSize, Item, Items } from 'app/modules/apps/file-manager/file-manager.types'
import { environment } from 'environments/environment'
import { Observable, firstValueFrom } from 'rxjs'
import { FileSelectComponent } from '../file-select/file-select.component'
import { Asset, AssetInterface } from 'app/shared/types/asset'
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop'

@Component({
    selector: 'multiple-upload',
    templateUrl: './multiple-upload.component.html',
    styleUrls: ['./multiple-upload.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
    exportAs: 'multiple-upload',
})
export class MultipleUploadComponent implements OnInit {
    protected selectedFiles: Asset[] = []
    protected env = environment

    @Input() close: Function
    @Input() label: string = 'Upload'
    @Input() files: Asset[] = []
    @Input() documenti: boolean = false

    @Output() readonly selected: EventEmitter<any> = new EventEmitter<any>()

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
        this.selectedFiles = this.files ? this.files : []
    }

    public openFileManager(): void {
        this._modalService.open({
            title: 'File Manager',
            id: 'file_manager',
            notitle: true,
            dynamicComponent: FileSelectComponent,
            bind: {
                currentFolder: this.documenti ? 'public/documents/' : 'public/',
                multiple: true,
                documenti: this.documenti,
                close: (event) => {
                    this.selectedFiles = Array.isArray(event) ? [...this.selectedFiles, ...event] : [...this.selectedFiles, event]
                    this.emit()
                    this._changeDetectorRef.markForCheck()
                    this._modalService.close('file_manager')
                },
            },
        } as ModalComponentData)
    }

    public emit() {
        this.selected.emit(this.selectedFiles)
    }

    public removeImage(file: Asset) {
        this.selectedFiles = this.selectedFiles.map((item) => {
            if (item === file) {
                item.deleted = !item.deleted
            }
            return item
        })
        this.emit()
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.selectedFiles, event.previousIndex, event.currentIndex)
        this.selectedFiles.forEach((item, index) => {
            item.ordine = index
        })
    }

    /**
     * genero il percorso del file della CDN
     */
    public getFilePath(file: Asset, size: ImageSize = 256): string {
        return this.generateFilePath(file, size)
    }

    public generateFilePath(file: any, size: ImageSize = 256): string {
        const relativepath = file.path.replace(this.documenti ? 'public/documents' : 'public/', '').split('/')
        const last = relativepath.pop()
        const lastPath = relativepath.join()

        return environment.cdn + (lastPath ? lastPath + '/' : '') + size + '/' + last
    }

    public getExtension(file: AssetInterface): string {
        return this._fileManagerService.getExtension(file)
    }
}
