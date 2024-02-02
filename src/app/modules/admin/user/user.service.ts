import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { User, UserFormData } from './user.types'
import { BaseService } from 'app/shared/types/baseService'

@Injectable({
    providedIn: 'root',
})
export class UserService extends BaseService<User, UserFormData> {
    protected endpoint: string = 'users'
}
