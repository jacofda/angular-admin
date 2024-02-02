export interface Role {
    id: number | null
    name: string | null
    title: string | null
    permissions: string[] | null
    created_at: string | null
    updated_at: string | null
}

export class RoleData implements Role {
    id: number | null
    name: string | null
    title: string | null
    permissions: string[] | null
    created_at: string | null
    updated_at: string | null
    

    constructor(item?: Role) {
        this.id = item?.id ?? null
        this.name = item?.name ?? null
        this.title = item?.title ?? null
        this.permissions = item?.permissions ?? []
        this.created_at = item?.created_at ?? null
        this.updated_at = item?.updated_at ?? null
    }
}

export type RoleFormData = Omit<Role, 'id' | 'created_at' | 'updated_at'>

export interface Pagination {
    totalItems: number
    totalPages: number
    currentPage: number
}

export interface SearchParam {
    field: string
    value: string
}
