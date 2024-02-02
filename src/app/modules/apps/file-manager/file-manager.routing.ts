import { Route } from '@angular/router'
import { FileManagerComponent } from 'app/modules/apps/file-manager/file-manager.component'
import { FileManagerListComponent } from 'app/modules/apps/file-manager/list/list.component'


export const fileManagerRoutes: Route[] = [
    {
        path: '',
        component: FileManagerListComponent,
    },
]
