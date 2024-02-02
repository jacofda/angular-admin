import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { SharedModule } from 'app/shared/shared.module'
import { RouterModule } from '@angular/router'
import { MatMenuModule } from '@angular/material/menu'
import { SummaryFilterTableComponent } from './summary.component'
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';

@NgModule({
    declarations: [SummaryFilterTableComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule, SharedModule, RouterModule, MatMenuModule, MatChipsModule],
    exports: [SummaryFilterTableComponent],
})
export class SummaryFilterTableModule {}
