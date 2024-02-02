import { Route } from '@angular/router'
import { BlogComponent } from './blog.component'
import { BlogListComponent } from './list/list.component'
import { BlogDetailsComponent } from './details/details.component'

export const blogRoutes: Route[] = [
    {
        path: '',
        component: BlogComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: BlogListComponent,
            },
            {
                path: 'create',
                component: BlogDetailsComponent,
            },

            {
                path: ':id',
                component: BlogDetailsComponent,
            },
        ],
    },
]
