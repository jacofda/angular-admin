import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, catchError, filter, firstValueFrom, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs'
import { environment } from 'environments/environment'
import qs from 'qs'
import { TableData } from 'app/shared/types/tableData'

@Injectable({
    providedIn: 'root',
})
export class FormSelectService {
   
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    public async selectFormSearch(func: Observable<any>): Promise<any> {
        return await firstValueFrom(func);
    }
}
