import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core'
import { Subject } from 'rxjs'

import { fuseAnimations } from '@fuse/animations'
import { FormGroup } from '@angular/forms'
import { environment } from 'environments/environment'
import { FileSelectComponent } from '../form/file-select/file-select.component'
import { ModalComponentData } from '../modal/modal.types'
import { ModalService } from '../modal/modal.service'
import { Asset, AssetInterface } from 'app/shared/types/asset'

declare const tinymce: any

@Component({
    selector: 'mow-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
    exportAs: 'mowEditor',
})
export class MowEditorComponent implements OnInit, OnDestroy {
    @Input() label?: string
    @Input() formName?: string
    @Input() formParent?: FormGroup
    @Input() scheme?: string
    @Input() config?: any

    @Output() readonly modalOpen: EventEmitter<any> = new EventEmitter<any>()

    private _unsubscribeAll: Subject<any> = new Subject<any>()

    protected selectedFile: AssetInterface
    public tinyKey = environment.tiny
    public value: string = ''
    public skin = 'oxide'

    /**
     * Constructor
     */
    constructor(private _changeDetectorRef: ChangeDetectorRef, protected _modalService: ModalService) {}

    changed(): void {}

    ngOnInit(): void {
        if (this.scheme === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.skin = 'oxide-dark'
        }
        if (this.scheme === 'dark') {
            this.skin = 'oxide-dark'
        }
        this._changeDetectorRef.markForCheck()
    }

    getInit(): any {
        return (
            this.config ?? {
                plugins: 'lists link code wordcount image codesample emoticons',
                skin: this.skin,
                menubar: false,
                toolbar:
                    'code codesample | image | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | fullscreen | emoticons',
                file_picker_callback: (callback, value, meta) => {
                    this.openFileManager(callback)
                },
                image_class_list: [
                    { title: 'None', value: '' },
                    { title: 'Larghezza Responsive 100%', value: 'w-full rounded-2xl object-contain' },
                    { title: 'Larghezza Responsive 50% centrale (1 img)', value: 'w-full lg:w-1/2 mx-auto rounded-2xl object-contain' },
                    { title: 'Larghezza Responsive 50% flex (2 img)', value: 'w-full lg:w-1/2 rounded-2xl object-cover aspect-[16/9]' },
                    { title: 'Larghezza Responsive 33% flex (3 img)', value: 'w-full lg:w-1/3 rounded-2xl object-cover aspect-[16/9]' },
                ],
            }
        )
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null)
        this._unsubscribeAll.complete()
    }

    public openFileManager = (callback: (url: string) => void): void => {
        this._modalService.open({
            title: 'File Manager',
            id: 'file_manager',
            notitle: true,
            dynamicComponent: FileSelectComponent,
            bind: {
                currentFolder: 'public/',
                documenti: false,
                close: (event) => {
                    this.selectedFile = new Asset({ ...this.selectedFile, ...event })
                    this._changeDetectorRef.markForCheck()
                    this._modalService.close('file_manager')
                    callback(environment.cdn + this.selectedFile.name)
                },
            },
        } as ModalComponentData)

        tinymce.activeEditor.execCommand('mceInsertContent', false, '')
    }
}
