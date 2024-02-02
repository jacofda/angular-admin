import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs'
import { ImageSize, Item, Items } from 'app/modules/apps/file-manager/file-manager.types'
import { environment } from 'environments/environment'
import { AssetInterface } from 'app/shared/types/asset'

@Injectable({
    providedIn: 'root',
})
export class FileManagerService {
    // Private
    private _item: BehaviorSubject<Item | null> = new BehaviorSubject(null)
    private _items: BehaviorSubject<Items | null> = new BehaviorSubject(null)

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for items
     */
    get items$(): Observable<Items> {
        return this._items.asObservable()
    }

    /**
     * Getter for item
     */
    get item$(): Observable<Item> {
        return this._item.asObservable()
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get items
     */
    getItems(folderId: string | null = null): Observable<Item[]> {
        // , { params: { folderId } }
        return this._httpClient.get<Items>(environment.baseUrl + 'bucket').pipe(
            tap((response: any) => {
                // Update the items
                this._items.next(response)
            })
        )
    }

    /**
     * Get item by id
     */
    getItemById(id: string): Observable<Item> {
        return this._httpClient.get<any>(environment.baseUrl + 'bucket/file?key=' + encodeURIComponent(id)).pipe(
            tap((response: any) => {
                // Update the items
                this._item.next(response)
            })
        )
    }

    public deleteFile(file) {
        return this._httpClient.delete(environment.baseUrl + 'bucket?key=' + file)
    }

    public uploadFile(files: File[], path = null): Observable<any> {
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
            formData.append('asset', files[i], files[i].name)
        }
        return this._httpClient.post<any>(environment.baseUrl + 'bucket/upload?path=' + path, formData)
    }

    public fileIsAnImage(file: Item): boolean {
        const imageTypes = ['JPG', 'JPEG', 'PNG', 'GIF', 'SVG', 'WEBP']
        return imageTypes.includes(file.type.toUpperCase())
    }

    public generateFilePath(file: Item, size: ImageSize = 256): string {
        const relativepath = file.path.replace('public/', '/').split('/')
        const last = relativepath.pop()
        const lastPath = relativepath.join()
        return environment.cdn + lastPath + last
    }

    public getExtension(file: AssetInterface): string {
        return file.path.split('.').pop().toUpperCase()
    }
}
