import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { SharedModule } from 'app/shared/shared.module'
import { ChildTableComponent } from './child-table.component'
import { ActionsTableModule } from '../actions/actions.module'
import { ModalModule } from 'app/components/modal'
import { FiltersTableModule } from '../filters/filters.module'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'

@NgModule({
    declarations: [ChildTableComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule, SharedModule, ActionsTableModule, ModalModule, FiltersTableModule, NgxDatatableModule],
    exports: [ChildTableComponent],
})
export class ChildTableModule {}
