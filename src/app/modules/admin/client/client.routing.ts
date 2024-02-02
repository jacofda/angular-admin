import { Route } from '@angular/router'
import { ClientComponent } from './client.component'
import { ClientListComponent } from './list/list.component'
import { ClientDetailsComponent } from './details/details.component'

export const clientRoutes: Route[] = [
    {
        path: '',
        component: ClientComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: ClientListComponent,
            },
            {
                path: 'create',
                component: ClientDetailsComponent,
            },

            {
                path: ':id',
                component: ClientDetailsComponent,
            },
        ],
    },
]
