import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { FileUploadModule } from '@iplab/ngx-file-upload'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UploadComponent } from 'app/components/upload/upload.component'

@NgModule({
    declarations: [UploadComponent],
    imports: [CommonModule, MatIconModule, MatButtonModule, FileUploadModule, FormsModule, ReactiveFormsModule],
    exports: [UploadComponent],
})
export class UploadModule {}
