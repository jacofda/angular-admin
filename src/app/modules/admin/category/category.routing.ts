import { Route } from '@angular/router'
import { CategoryComponent } from './category.component'
import { CategoryListComponent } from './list/list.component'
import { CategoryDetailsComponent } from './details/details.component'

export const categoryRoutes: Route[] = [
    {
        path: '',
        component: CategoryComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: CategoryListComponent,
            },
            {
                path: 'create',
                component: CategoryDetailsComponent,
            },

            {
                path: ':id',
                component: CategoryDetailsComponent,
            },
        ],
    },
]
