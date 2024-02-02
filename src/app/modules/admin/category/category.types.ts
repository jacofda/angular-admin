export interface Category {
    id: number | null
    nome: string | null
    created_at: string | null
    updated_at: string | null
}

export class CategoryData implements Category {
    id: number | null
    nome: string | null
    created_at: string | null
    updated_at: string | null

    constructor(item?: Category) {
        this.id = item?.id ?? null
        this.nome = item?.nome ?? null
        this.created_at = item?.created_at ?? null
        this.updated_at = item?.updated_at ?? null
    }
}

export type CategoryFormData = Omit<Category, 'id' | 'created_at' | 'updated_at'>

export interface Pagination {
    totalItems: number
    totalPages: number
    currentPage: number
}

export interface SearchParam {
    field: string
    value: string
}
