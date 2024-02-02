import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { TabsComponent } from './tabs.component'
import {MatTabsModule} from '@angular/material/tabs';
import { DynamicIoModule } from 'ng-dynamic-component'
import { MatSelectModule } from '@angular/material/select'

@NgModule({
    declarations: [TabsComponent],
    imports: [CommonModule, MatIconModule, MatButtonModule, MatTabsModule, DynamicIoModule, MatSelectModule],
    exports: [TabsComponent],
})
export class TabsModule {}
