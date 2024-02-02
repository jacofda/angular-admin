import { Injectable } from '@angular/core'
import { DummyCase, DummyCaseFormData } from './dummy_case.types'
import { BaseService } from 'app/shared/types/baseService'

@Injectable({
    providedIn: 'root',
})
export class DummyCaseService extends BaseService<DummyCase, DummyCaseFormData> {
    protected endpoint: string = 'dummies-case'
}
