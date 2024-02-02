import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { SharedModule } from 'app/shared/shared.module'
import { RouterModule } from '@angular/router'
import { MatMenuModule } from '@angular/material/menu'
import { PermissionsSelectComponent } from './permissions-select.component'

@NgModule({
    declarations: [PermissionsSelectComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule, SharedModule, RouterModule, MatMenuModule],
    exports: [PermissionsSelectComponent],
})
export class PermissionsSelectModule {}