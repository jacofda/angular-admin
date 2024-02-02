import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { ModalComponent } from 'app/components/modal/modal.component'

@NgModule({
    declarations: [ModalComponent],
    imports: [CommonModule, MatIconModule, MatButtonModule],
    exports: [ModalComponent],
})
export class ModalModule {}
