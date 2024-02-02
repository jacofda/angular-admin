export interface DummyCase {
    id: number | null
    nome: string | null
    created_at: string | null
    updated_at: string | null
}

export class DummyCaseData implements DummyCase {
    id: number | null
    nome: string | null
    created_at: string | null
    updated_at: string | null

    constructor(item?: DummyCase) {
        this.id = item?.id ?? null
        this.nome = item?.nome ?? null
        this.created_at = item?.created_at ?? null
        this.updated_at = item?.updated_at ?? null
    }
}

export type DummyCaseFormData = Omit<DummyCase, 'id' | 'created_at' | 'updated_at'>

export interface Pagination {
    totalItems: number
    totalPages: number
    currentPage: number
}

export interface SearchParam {
    field: string
    value: string
}
