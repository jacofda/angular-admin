import { Injectable } from '@angular/core'
import { Review, ReviewFormData } from './review.types'
import { BaseService } from 'app/shared/types/baseService'

@Injectable({
    providedIn: 'root',
})
export class ReviewService extends BaseService<Review, ReviewFormData> {
    protected endpoint: string = 'reviews'
}
