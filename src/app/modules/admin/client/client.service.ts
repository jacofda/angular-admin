import { Injectable } from '@angular/core'
import { Client, ClientFormData } from './client.types'
import { BaseService } from 'app/shared/types/baseService'

@Injectable({
    providedIn: 'root',
})
export class ClientService extends BaseService<Client, ClientFormData> {
    protected endpoint: string = 'clients'
}
