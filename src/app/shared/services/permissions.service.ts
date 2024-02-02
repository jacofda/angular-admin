import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'environments/environment'
import { Permission } from '../types/permission'

@Injectable({
    providedIn: 'root',
})
export class PermissionsService {
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    /**
     * Ritorna la lista degli scenari
     */
    public list(): Observable<Permission[]> {
        return this._httpClient.get<Permission[]>(environment.baseUrl + 'permissions')
    }
}
