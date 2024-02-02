import { NgModule } from '@angular/core';
import { AvatarComponent } from './avatar.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
    declarations: [AvatarComponent],
    imports: [MatIconModule, SharedModule],
    exports: [AvatarComponent],
})
export class AvatarModule {}