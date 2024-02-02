import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { SharedModule } from 'app/shared/shared.module'
import { RouterModule } from '@angular/router'
import { MatMenuModule } from '@angular/material/menu'
import { FileSelectComponent } from './file-select.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@NgModule({
    declarations: [FileSelectComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule, SharedModule, RouterModule, MatMenuModule, MatProgressSpinnerModule, MatIconModule],
    exports: [FileSelectComponent],
})
export class FileSelectModule {}
