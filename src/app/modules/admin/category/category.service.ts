import { Injectable } from '@angular/core'
import { Category, CategoryFormData } from './category.types'
import { BaseService } from 'app/shared/types/baseService'

@Injectable({
    providedIn: 'root',
})
export class CategoryService extends BaseService<Category, CategoryFormData> {
    protected endpoint: string = 'categories'
}
