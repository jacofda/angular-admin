import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core'
import { UploadService } from 'app/components/upload/upload.service'
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload'
import { Observable, forkJoin, take } from 'rxjs'
import { FileManagerService } from 'app/modules/apps/file-manager/file-manager.service'

@Component({
    selector: 'mow-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UploadComponent implements OnInit, OnDestroy {
    public uploadedFiles: Array<File> = []

    @Input() public multiple: boolean = false
    @Input() public prefix: string
    @Input() public accept: string = 'image/*'
    @Input() public files: string[]
    @Input() public cdn: string
    @Input() public close: Function
    @Output() readonly change: EventEmitter<any> = new EventEmitter<any>()

    constructor(private _elementRef: ElementRef, private _uploadService: FileManagerService) {}

    public fileUploadWithTemplate = new FileUploadControl({ accept: [this.accept] }, FileUploadValidators.accept([this.accept]))

    ngOnDestroy(): void {}

    ngOnInit(): void {
        this.fileUploadWithTemplate = new FileUploadControl({ accept: [this.accept] }, FileUploadValidators.accept([this.accept]))

        this.fileUploadWithTemplate.valueChanges.subscribe((files: File[]) => {
            if (files.length) {
                const filesToUpload: Array<Observable<any>> = []
                files.forEach((element) => {
                    filesToUpload.push(this._uploadService.uploadFile([element], this.prefix))
                })

                forkJoin(filesToUpload)
                    .pipe(take(1))
                    .subscribe({
                        next: (results) => {
                            // I risultati delle chiamate parallele sono disponibili qui
                        },
                        error: (error) => {
                            // Gestisci eventuali errori qui
                            console.error('Si è verificato un errore:', error)
                        },
                        complete: () => {
                            this.close()
                        },
                    })
            }

            this.change.emit(files)
        })
    }
}
