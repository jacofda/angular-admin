import { ChangeDetectorRef, Injectable } from '@angular/core'

import { ModalComponent } from 'app/components/modal/modal.component'
import { ModalComponentData } from './modal.types'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class ModalService {
    private _modalsContainer$: BehaviorSubject<any[]> = new BehaviorSubject<ModalComponent[]>([])

    // getter of the observable used to print *ngFor in the layout
    get modals$(): Observable<ModalComponentData[]> {
        return this._modalsContainer$.asObservable()
    }

    // add modal to array of list modals used to print *ngFor in the layout
    open(modal: ModalComponentData) {
        const currentModals = this._modalsContainer$.getValue()
        if (currentModals.find((m) => m.id === modal.id) === undefined) {
            this._modalsContainer$.next([...currentModals, modal])
        }
    }

    close(id: string) {
        const newModals: ModalComponentData[] = this._modalsContainer$.getValue().filter((m: ModalComponentData) => {
            return m.id !== id
        })
        this._modalsContainer$.next(newModals)
    }
}
