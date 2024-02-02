export interface Review {
    id: number | null
    name: string | null
    position: string | null
    body: string | null
    client_id: number | null
    created_at: string | null
    updated_at: string | null
}

export class ReviewData implements Review {
    id: number | null
    name: string | null
    position: string | null
    body: string | null
    client_id: number | null
    created_at: string | null
    updated_at: string | null

    constructor(item?: Review) {
        this.id = item?.id ?? null
        this.name = item?.name ?? null
        this.position = item?.position ?? null
        this.body = item?.body ?? null
        this.client_id = item?.client_id ?? null
        this.created_at = item?.created_at ?? null
        this.updated_at = item?.updated_at ?? null
    }
}

export type ReviewFormData = Omit<Review, 'id' | 'created_at' | 'updated_at'>

export interface Pagination {
    totalItems: number
    totalPages: number
    currentPage: number
}

export interface SearchParam {
    field: string
    value: string
}
