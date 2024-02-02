import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Role, RoleFormData } from './role.types'
import { BaseService } from 'app/shared/types/baseService'

@Injectable({
    providedIn: 'root',
})
export class RoleService extends BaseService<Role, RoleFormData> {
    protected endpoint: string = 'roles'
}
