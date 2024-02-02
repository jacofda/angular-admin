import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { FiltersTableComponent } from './filters.component'
import { SharedModule } from 'app/shared/shared.module'

@NgModule({
    declarations: [FiltersTableComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule, SharedModule],
    exports: [FiltersTableComponent],
})
export class FiltersTableModule {}
