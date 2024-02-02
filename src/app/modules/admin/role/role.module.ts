import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'app/shared/shared.module'
import { RouterModule } from '@angular/router'
import { FiltersTableModule } from 'app/components/table/filters/filters.module'
import { ActionsTableModule } from 'app/components/table/actions/actions.module'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { MassActionsTableModule } from 'app/components/table/mass_actions/massaction.module'
import { FormNavigationModule } from 'app/components/form/navigation.module'
import { SummaryFilterTableModule } from 'app/components/table/filters_summary/summary.module'
import { FormSelectModule } from 'app/components/form/select/select.module'
import { ValidationErrorsModule } from 'app/components/form/validation-errors/validation-errors.module'
import { SingleUploadModule } from 'app/components/form/single-upload/single-upload.module'
import { RoleComponent } from './role.component'
import { RoleListComponent } from './list/list.component'
import { RoleDetailsComponent } from './details/details.component'
import { roleRoutes } from './role.routing'
import { PermissionsSelectModule } from 'app/components/form/permissions-select/permissions-select.module'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
    declarations: [RoleComponent, RoleListComponent, RoleDetailsComponent],
    imports: [
        RouterModule.forChild(roleRoutes),
        SharedModule,
        CommonModule,
        FiltersTableModule,
        FormNavigationModule,
        MassActionsTableModule,
        ActionsTableModule,
        NgxDatatableModule,
        SummaryFilterTableModule,
        FormSelectModule,
        ValidationErrorsModule,
        SingleUploadModule,
        PermissionsSelectModule,
        TranslocoModule,
    ],
})
export class RoleModule {}
