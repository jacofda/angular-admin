import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { SharedModule } from 'app/shared/shared.module'
import { ActionsTableComponent } from './actions.component'
import { RouterModule } from '@angular/router'
import { MatMenuModule } from '@angular/material/menu'

@NgModule({
    declarations: [ActionsTableComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule, SharedModule, RouterModule, MatMenuModule],
    exports: [ActionsTableComponent],
})
export class ActionsTableModule {}
