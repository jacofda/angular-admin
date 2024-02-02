import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'app/shared/shared.module'
import { RouterModule } from '@angular/router'
import { FiltersTableModule } from 'app/components/table/filters/filters.module'
import { ProgrammiComponent } from './programmi.component'
import { ProgrammiListComponent } from './list/list.component'
import { ProgrammiDetailsComponent } from './details/details.component'
import { programmiRoutes } from './programmi.routing'
import { ActionsTableModule } from 'app/components/table/actions/actions.module'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { MassActionsTableModule } from 'app/components/table/mass_actions/massaction.module'
import { FormNavigationModule } from 'app/components/form/navigation.module'
import { SummaryFilterTableModule } from 'app/components/table/filters_summary/summary.module'
import { FormSelectModule } from 'app/components/form/select/select.module'
import { SingleUploadModule } from 'app/components/form/single-upload/single-upload.module'
import { ValidationErrorsModule } from 'app/components/form/validation-errors/validation-errors.module'
import { MultipleUploadModule } from 'app/components/form/muliple-upload/multiple-upload.module'
import { MatDividerModule } from '@angular/material/divider'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
    declarations: [ProgrammiComponent, ProgrammiListComponent, ProgrammiDetailsComponent],
    imports: [
        RouterModule.forChild(programmiRoutes),
        SharedModule,
        CommonModule,
        FiltersTableModule,
        FormNavigationModule,
        MassActionsTableModule,
        ActionsTableModule,
        NgxDatatableModule,
        SummaryFilterTableModule,
        FormSelectModule,
        SingleUploadModule,
        MultipleUploadModule,
        ValidationErrorsModule,
        MatDividerModule,
        TranslocoModule,
    ],
})
export class ProgrammiModule {}
