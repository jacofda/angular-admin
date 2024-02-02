import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { SharedModule } from 'app/shared/shared.module'
import { RouterModule } from '@angular/router'
import { MatMenuModule } from '@angular/material/menu'
import { SingleUploadComponent } from './single-upload.component'
import { FileSelectModule } from '../file-select/file-select.module'

@NgModule({
    declarations: [SingleUploadComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule, SharedModule, RouterModule, MatMenuModule, FileSelectModule],
    exports: [SingleUploadComponent],
})
export class SingleUploadModule {}
