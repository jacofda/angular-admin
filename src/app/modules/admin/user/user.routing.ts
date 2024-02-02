import { Route } from '@angular/router'
import { UserComponent } from './user.component'
import { UserListComponent } from './list/list.component'
import { UserDetailsComponent } from './details/details.component'

export const userRoutes: Route[] = [
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: UserListComponent,
            },
            {
                path: 'create',
                component: UserDetailsComponent,
            },

            {
                path: ':id',
                component: UserDetailsComponent,
            },
        ],
    },
]
