import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, catchError, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs'
import { environment } from 'environments/environment'
import qs from 'qs'
import { TableData } from 'app/shared/types/tableData'
import { ScenariData } from '../types/scenariData'

@Injectable({
    providedIn: 'root',
})
export class ScenariService {

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient
    ) {}

    /**
     * Ritorna la lista degli scenari
     */
    public getScenari(tablekey: string): Observable<ScenariData[]> {
        return this._httpClient.get<ScenariData[]>(environment.baseUrl + 'scenari?tabella=' + tablekey);
    }

    /**
     * Ritorna uno scenario
     */
    public load(id: number): Observable<ScenariData> {
        return this._httpClient.get<ScenariData>(environment.baseUrl + 'scenari/' + id);
    }

    /**
     * SalvaScenario
     */
    public save(body): Observable<ScenariData> {
        return this._httpClient.post<ScenariData>(environment.baseUrl + 'scenari', body);
    }

     /**
     * Delete Scenario
     */
     public delete(id: number): Observable<ScenariData> {
        return this._httpClient.delete<ScenariData>(environment.baseUrl + 'scenari/' + id);
    }
}
