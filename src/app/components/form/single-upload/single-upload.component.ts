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

@Component({
    selector: 'single-upload',
    templateUrl: './single-upload.component.html',
    styleUrls: ['./single-upload.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
    exportAs: 'single-upload',
})
export class SingleUploadComponent implements OnInit {
    protected selectedFile: AssetInterface
    protected env = environment

    @Input() close: Function
    @Input() label: string = 'Upload'
    @Input() file: AssetInterface
    @Input() documento: boolean = false

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
        this.selectedFile = this.file
    }

    public openFileManager(): void {
        this._modalService.open({
            title: 'File Manager',
            id: 'file_manager',
            notitle: true,
            dynamicComponent: FileSelectComponent,
            bind: {
                currentFolder: this.documento ? 'public/documents/' : 'public/',
                documenti: this.documento,
                close: (event) => {
                    this.selectedFile = new Asset({ ...this.selectedFile, ...event })
                    this.emit()
                    this._changeDetectorRef.markForCheck()
                    this._modalService.close('file_manager')
                },
            },
        } as ModalComponentData)
    }

    public emit() {
        this.selected.emit(this.selectedFile)
    }

    public generateFilePath(file: any, size: ImageSize = 256): string {
        const relativepath = file.path.replace(this.documento ? 'public/documents' : 'public/', '').split('/')
        const last = relativepath.pop()
        const lastPath = relativepath.join()

        return environment.cdn + (lastPath ? lastPath + '/' : '') + last
    }

    public getExtension(file: AssetInterface): string {
        return this._fileManagerService.getExtension(file)
    }
}
