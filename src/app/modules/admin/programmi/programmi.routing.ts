import { Route } from '@angular/router'
import { ProgrammiComponent } from './programmi.component'
import { ProgrammiListComponent } from './list/list.component'
import { ProgrammiDetailsComponent } from './details/details.component'

export const programmiRoutes: Route[] = [
    {
        path: '',
        component: ProgrammiComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: ProgrammiListComponent,
            },
            {
                path: 'create',
                component: ProgrammiDetailsComponent,
            },

            {
                path: ':id',
                component: ProgrammiDetailsComponent,
            },
        ],
    },
]
