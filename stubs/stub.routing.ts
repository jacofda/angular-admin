import { Route } from '@angular/router'
import { DummyCaseComponent } from './dummy_case.component'
import { DummyCaseListComponent } from './list/list.component'
import { DummyCaseDetailsComponent } from './details/details.component'

export const dummyCaseRoutes: Route[] = [
    {
        path: '',
        component: DummyCaseComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: DummyCaseListComponent,
            },
            {
                path: 'create',
                component: DummyCaseDetailsComponent,
            },

            {
                path: ':id',
                component: DummyCaseDetailsComponent,
            },
        ],
    },
]
