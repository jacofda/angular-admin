import { Permission } from 'app/shared/types/permission'

export class PermissionsSelect {
    constructor(public group: string, public permission: Permission, public selected: boolean = false) {}

    get pretty(): string {
        switch (this.permission.name.split('_')[1]) {
            case 'create':
                return 'Crea'
            case 'view':
                return 'Visualizza'
            case 'update':
                return 'Modifica'
            case 'delete':
                return 'Elimina'
        }

        return this.permission.name
    }
}

export class PermissionsSelectRow {
    public selects: PermissionsSelect[] = []

    constructor(public group: string) {}

    get pretty(): string {
        return this.group.replace(/^\w/, (c) => c.toUpperCase())
    }

    public push(permission: PermissionsSelect) {
        this.selects.push(permission)
    }

    public someSelected(): boolean {
        if (this.allSelected()) {
            return false
        }

        return this.selects.some((permission) => permission.selected)
    }

    public allSelected(): boolean {
        return this.selects.every((permission) => permission.selected)
    }

    public selectAll(value: boolean) {
        for (const permission of this.selects) {
            permission.selected = value
        }
    }

    public get selected(): Permission[] {
        return this.selects.filter((x) => x.selected).map((x) => x.permission)
    }

    public set selected(permissions: Permission[]) {
        const ids = permissions.map((x) => x.id)
        for (const select of this.selects) {
            select.selected = ids.includes(select.permission.id)
        }
    }
}

export class PermissionsSelectRows {
    public rows: Map<string, PermissionsSelectRow> = new Map()

    constructor(permissions: Permission[]) {
        for (const permission of permissions) {
            const [group, action] = permission.name.split('_')

            if (!this.rows[group]) {
                this.rows[group] = new PermissionsSelectRow(group)
            }

            this.rows[group].push(new PermissionsSelect(group, permission))
        }
    }

    public get selected(): Permission[] {
        const selected: Permission[] = []

        for (const group in this.rows) {
            selected.push(...this.rows[group].selected)
        }

        return selected
    }

    public set selected(permissions: Permission[]) {
        for (const group in this.rows) {
            this.rows[group].selected = permissions
        }
    }
}
