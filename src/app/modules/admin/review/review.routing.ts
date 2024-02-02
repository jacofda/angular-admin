import { Route } from '@angular/router'
import { ReviewComponent } from './review.component'
import { ReviewListComponent } from './list/list.component'
import { ReviewDetailsComponent } from './details/details.component'

export const reviewRoutes: Route[] = [
    {
        path: '',
        component: ReviewComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: ReviewListComponent,
            },
            {
                path: 'create',
                component: ReviewDetailsComponent,
            },

            {
                path: ':id',
                component: ReviewDetailsComponent,
            },
        ],
    },
]
