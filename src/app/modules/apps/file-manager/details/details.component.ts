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
import { MatDrawerToggleResult } from '@angular/material/sidenav'
import { Subject, takeUntil } from 'rxjs'
import { FileManagerListComponent } from 'app/modules/apps/file-manager/list/list.component'
import { FileManagerService } from 'app/modules/apps/file-manager/file-manager.service'
import { ImageSize, Item } from 'app/modules/apps/file-manager/file-manager.types'
import { Router } from '@angular/router'

@Component({
    selector: 'file-manager-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileManagerDetailsComponent implements OnInit, OnDestroy {
    @Output() deleteCompleted = new EventEmitter<string>()
    @Output() close = new EventEmitter<any>()
    @Input() item: Item
    @Input() currentFolder: String;
    private _unsubscribeAll: Subject<any> = new Subject<any>()

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fileManagerListComponent: FileManagerListComponent,
        private _fileManagerService: FileManagerService,
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Open the drawer
        this._fileManagerListComponent.matDrawer.open()


    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null)
        this._unsubscribeAll.complete()
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    public delete(file) {
        this._fileManagerService.deleteFile(file.path).subscribe({
            next: (response) => {
            },
            error: (error) => {
                console.log(error)
            },
            complete: () => {
                this._fileManagerListComponent.loadData()
            },
        })
        this._fileManagerListComponent.matDrawer.close()
        this._router.navigate(['file-manager'])

        // Mark for chec
        this._changeDetectorRef.markForCheck()
    }

    public open(event, file): void {
        if (this.isImage(file)) {
            window.open(this._fileManagerService.generateFilePath(file, 1024), '_blank')
        }
    }

    public isImage(file: Item): boolean {
        return this._fileManagerService.fileIsAnImage(file)
    }

    /**
     * genero il percorso del file della CDN
     */
    public getFilePath(file: Item, size: ImageSize = 256): string {
        return this._fileManagerService.generateFilePath(file, size)
    }

    /**
     * Close the drawer
     */
    closeDrawer(): void {
        this.close.emit();
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
