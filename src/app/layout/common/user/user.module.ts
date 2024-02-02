import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { AvatarModule } from 'app/components/avatar/avatar.module'
import { UserComponent } from 'app/layout/common/user/user.component'
import { SharedModule } from 'app/shared/shared.module'

@NgModule({
    declarations: [UserComponent],
    imports: [MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule, SharedModule, AvatarModule],
    exports: [UserComponent],
})
export class UserModule {}
