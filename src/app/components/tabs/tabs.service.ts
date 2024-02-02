import { Injectable } from '@angular/core'
import { Tab } from 'app/shared/types/tabs'

import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class TabsService {
    private _tabs$: BehaviorSubject<Array<Tab>> = new BehaviorSubject<Array<Tab>>([])

    get tabs$(): Observable<Array<Tab>> {
        return this._tabs$.asObservable()
    }

    set tabs(tabs: Array<Tab>) {
        const activeTabs = tabs.filter((tab) => tab.isShowable());
        this._tabs$.next(activeTabs)
    }
}
