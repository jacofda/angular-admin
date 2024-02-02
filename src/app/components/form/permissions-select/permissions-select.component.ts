import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    Output,
    ViewEncapsulation,
    EventEmitter,
    Input,
    ViewChild,
    ElementRef,
    AfterViewInit,
    SimpleChanges,
} from '@angular/core'
import { fuseAnimations } from '@fuse/animations'
import { RoleService } from 'app/modules/admin/role/role.service'
import { PermissionsService } from 'app/shared/services/permissions.service'
import { PermissionsSelectRows } from './permissions-select.types'
import { Permission } from 'app/shared/types/permission'

@Component({
    selector: 'form-permissions-select',
    templateUrl: './permissions-select.component.html',
    styleUrls: ['./permissions-select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    animations: fuseAnimations,
    exportAs: 'form-permissions-select',
})
export class PermissionsSelectComponent implements OnInit, AfterViewInit {
    public allPermissions: PermissionsSelectRows
    public search: string = ''

    @Input() permissions: Permission[] = []

    @Output() permissionsChange: EventEmitter<Permission[]> = new EventEmitter<Permission[]>()

    constructor(protected _roleService: RoleService, protected _permissionsService: PermissionsService) {}

    /**
     * On init
     */
    ngOnInit(): void {
        this._permissionsService.list().subscribe((allPermissions) => {
            this.allPermissions = new PermissionsSelectRows(allPermissions)
            this.allPermissions.selected = this.permissions
        })
    }

    ngAfterViewInit() {}

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes)
        // Wait for allPermissions to be initialized
        if (!this.allPermissions) {
            return
        }

        this.allPermissions.selected = changes.permissions.currentValue
    }

    public selectAll() {
        for (const group of this.groups) {
            this.allPermissions.rows[group].selectAll(true)
        }
    }

    public deselectAll() {
        for (const group of this.groups) {
            this.allPermissions.rows[group].selectAll(false)
        }
    }

    get groups(): string[] {
        return Object.keys(this.allPermissions.rows)
            .filter(group => group.toLowerCase().includes(this.search.toLowerCase()))
    }
}
