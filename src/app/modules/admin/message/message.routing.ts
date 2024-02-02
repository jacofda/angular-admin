import { Route } from '@angular/router'
import { MessageComponent } from './message.component'
import { MessageListComponent } from './list/list.component'
import { MessageDetailsComponent } from './details/details.component'

export const messageRoutes: Route[] = [
    {
        path: '',
        component: MessageComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: MessageListComponent,
            },
            {
                path: 'create',
                component: MessageDetailsComponent,
            },

            {
                path: ':id',
                component: MessageDetailsComponent,
            },
        ],
    },
]
