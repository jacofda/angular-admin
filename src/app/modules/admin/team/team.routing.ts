import { Route } from '@angular/router'
import { TeamComponent } from './team.component'
import { TeamListComponent } from './list/list.component'
import { TeamDetailsComponent } from './details/details.component'

export const teamRoutes: Route[] = [
    {
        path: '',
        component: TeamComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: TeamListComponent,
            },
            {
                path: 'create',
                component: TeamDetailsComponent,
            },

            {
                path: ':id',
                component: TeamDetailsComponent,
            },
        ],
    },
]
