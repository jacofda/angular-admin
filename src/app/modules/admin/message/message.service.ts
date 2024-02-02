import { Injectable } from '@angular/core'
import { Message, MessageFormData } from './message.types'
import { BaseService } from 'app/shared/types/baseService'

@Injectable({
    providedIn: 'root',
})
export class MessageService extends BaseService<Message, MessageFormData> {
    protected endpoint: string = 'messages'
}
