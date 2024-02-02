import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MowAlertComponent } from 'app/components/alert/alert.component'

@NgModule({
    declarations: [MowAlertComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule],
    exports: [MowAlertComponent],
})
export class MowAlertModule {}
