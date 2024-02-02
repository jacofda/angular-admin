import { Route } from '@angular/router'
import { RoleComponent } from './role.component'
import { RoleListComponent } from './list/list.component'
import { RoleDetailsComponent } from './details/details.component'

export const roleRoutes: Route[] = [
    {
        path: '',
        component: RoleComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: RoleListComponent,
            },
            {
                path: 'create',
                component: RoleDetailsComponent,
            },

            {
                path: ':id',
                component: RoleDetailsComponent,
            },
        ],
    },
]
