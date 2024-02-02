import { Route } from '@angular/router'
import { CasestudyComponent } from './casestudy.component'
import { CasestudyListComponent } from './list/list.component'
import { CasestudyDetailsComponent } from './details/details.component'

export const casestudyRoutes: Route[] = [
    {
        path: '',
        component: CasestudyComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: CasestudyListComponent,
            },
            {
                path: 'create',
                component: CasestudyDetailsComponent,
            },

            {
                path: ':id',
                component: CasestudyDetailsComponent,
            },
        ],
    },
]
