import { Injectable } from '@angular/core'
import { Blog, BlogFormData } from './blog.types'
import { BaseService } from 'app/shared/types/baseService'

@Injectable({
    providedIn: 'root',
})
export class BlogService extends BaseService<Blog, BlogFormData> {
    protected endpoint: string = 'blogs'
}
