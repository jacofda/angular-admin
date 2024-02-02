import { Injectable } from '@angular/core'
import { Casestudy, CasestudyFormData } from './casestudy.types'
import { BaseService } from 'app/shared/types/baseService'

@Injectable({
    providedIn: 'root',
})
export class CasestudyService extends BaseService<Casestudy, CasestudyFormData> {
    protected endpoint: string = 'case-studies'
}
