import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, catchError, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs'
import { environment } from 'environments/environment'
import qs from 'qs'
import { TableData } from 'app/shared/types/tableData'
import { Pagination } from './pagination'

@Injectable({
    providedIn: 'root',
})
export class BaseService<Model, ModelFormData> {
    private _items: BehaviorSubject<Model[] | null> = new BehaviorSubject(null)
    private _pagination: BehaviorSubject<Pagination | null> = new BehaviorSubject(null)
    private _tableData: BehaviorSubject<TableData | null> = new BehaviorSubject(null)

    protected endpoint: string = ''

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    /**
     * Getter for items
     */
    get items$(): Observable<Model[]> {
        return this._items.asObservable()
    }

    /**
     * Getter for tabledata
     */
    get tableData$(): Observable<TableData> {
        return this._tableData.asObservable()
    }

    protected buildUrl(url: string = ''): string {
        return environment.baseUrl + this.endpoint + url
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get list
     */
    list(queryObject?: any): Observable<{ items: Model[]; pagination: Pagination }> {
        let queryString = '?table=true&'
        if (queryObject) {
            queryString += qs.stringify(queryObject)
        }

        return this._httpClient.get<{ items: Model[]; pagination: Pagination }>(this.buildUrl(queryString)).pipe(
            tap((response) => {
                this._items.next(response.items)
                this._pagination.next(response.pagination)
            })
        )
    }

    /**
     * Get tableData
     */
    getTableData(): Observable<TableData> {
        return this._httpClient.get<TableData>(this.buildUrl('/table')).pipe(
            tap((tableData) => {
                this._tableData.next(tableData)
            })
        )
    }

    /**
     * Edit
     * @param id
     * @returns
     */
    getById(id: string): Observable<Model> {
        return this._httpClient.get<Model>(this.buildUrl('/' + id)).pipe(
            map((data) => {
                return data
            }),
            switchMap((data) => {
                if (!data) {
                    return throwError(() => new Error('Could not found data with id of ' + id + '!'))
                }
                return of(data)
            })
        )
    }

    /**
     * Create
     */
    create(data: ModelFormData): Observable<Model> {
        return this._httpClient.post<Model>(this.buildUrl(), data).pipe(
            map((data) => {
                return data
            }),
            catchError((error) => {
                console.error('An error occurred: ', error)
                return throwError(() => error)
            })
        )
    }

    /**
     * Update
     */
    update(id: string | number, data: ModelFormData): Observable<Model> {
        return this._httpClient.put<Model>(this.buildUrl('/' + id), data).pipe(
            map((data) => {
                return data
            }),
            catchError((error) => {
                console.error('An error occurred: ', error)
                return throwError(() => error)
            })
        )
    }

    /**
     * Delete
     */
    delete(id: string | number): Observable<boolean> {
        return this._httpClient.delete(this.buildUrl('/' + id)).pipe(
            map((data: boolean) => {
                return data
            })
        )
    }
}
