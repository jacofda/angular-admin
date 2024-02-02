import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'environments/environment'

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    private _counts: BehaviorSubject<any | null> = new BehaviorSubject(null)

    constructor(private _httpClient: HttpClient) {}

    /**
 * Getter for counts
 */
    get counts$(): Observable<any> {
        return this._counts.asObservable()
    }

     /**
     * Get count della dashboard
     */
    getCount(queryObject?: any): Observable<{ items: any[];}> {
        return this._httpClient.get<{ items: any[]; }>(environment.baseUrl + 'dashboard').pipe(
            tap((response) => {
                this._counts.next(response)
            })
        )
    }
}
