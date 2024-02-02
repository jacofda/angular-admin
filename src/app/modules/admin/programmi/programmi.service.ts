import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Programmi, ProgrammiFormData } from './programmi.types'
import { BaseService } from 'app/shared/types/baseService'

@Injectable({
    providedIn: 'root',
})
export class ProgrammiService extends BaseService<Programmi, ProgrammiFormData> {
    protected endpoint: string = 'programmi'
}
