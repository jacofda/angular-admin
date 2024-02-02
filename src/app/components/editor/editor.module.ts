import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditorModule } from '@tinymce/tinymce-angular'
import { MowEditorComponent } from 'app/components/editor/editor.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'

@NgModule({
    declarations: [MowEditorComponent],
    imports: [CommonModule, EditorModule, FormsModule, ReactiveFormsModule, MatInputModule],
    exports: [MowEditorComponent, FormsModule, ReactiveFormsModule, MatInputModule],
})
export class MowEditorModule {}
