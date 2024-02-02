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
import { MultipleUploadModule } from 'app/components/form/muliple-upload/multiple-upload.module'
import { MessageComponent } from './message.component'
import { MessageListComponent } from './list/list.component'
import { MessageDetailsComponent } from './details/details.component'
import { messageRoutes } from './message.routing'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
    declarations: [MessageComponent, MessageListComponent, MessageDetailsComponent],
    imports: [
        RouterModule.forChild(messageRoutes),
        SharedModule,
        CommonModule,
        TranslocoModule,
        FiltersTableModule,
        FormNavigationModule,
        MassActionsTableModule,
        ActionsTableModule,
        NgxDatatableModule,
        SummaryFilterTableModule,
        FormSelectModule,
        ValidationErrorsModule,
        SingleUploadModule,
        MultipleUploadModule,
    ],
})
export class MessageModule {}
