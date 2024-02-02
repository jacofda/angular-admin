import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatTooltipModule } from '@angular/material/tooltip'
import { NgApexchartsModule } from 'ng-apexcharts'
import { SharedModule } from 'app/shared/shared.module'
import { DashboardComponent } from 'app/modules/admin/dashboard/dashboard.component'
import { dashboardRoutes } from 'app/modules/admin/dashboard/dashboard.routing'
import { TranslocoModule } from '@ngneat/transloco'
import { AvatarModule } from 'app/components/avatar/avatar.module'

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        RouterModule.forChild(dashboardRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        NgApexchartsModule,
        SharedModule,
        TranslocoModule,
        AvatarModule,
    ],
})
export class DashboardModule {}
