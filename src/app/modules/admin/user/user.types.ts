export interface User {
    id: number | null
    email: string | null
    name: string | null
    permissions: string[]
    role_id: number | null
    active: boolean
    created_at: string | null
    updated_at: string | null
}

export class UserData implements User {
    id: number | null
    email: string | null
    name: string | null
    permissions: string[]
    role_id: number | null
    active: boolean
    created_at: string | null
    updated_at: string | null

    constructor(item?: User) {
        this.id = item?.id ?? null
        this.name = item?.name ?? null
        this.email = item?.email ?? null
        this.permissions = item?.permissions ?? []
        this.role_id = item?.role_id ?? null
        this.active = item?.active ?? false
        this.created_at = item?.created_at ?? null
        this.updated_at = item?.updated_at ?? null
    }
}

export type UserFormData = Omit<User, 'id' | 'created_at' | 'updated_at'>

export interface Pagination {
    totalItems: number
    totalPages: number
    currentPage: number
}

export interface SearchParam {
    field: string
    value: string
}
