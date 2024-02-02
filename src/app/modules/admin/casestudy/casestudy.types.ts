import { Asset } from 'app/shared/types/asset'

export interface Casestudy {
    id: number | null
    titolo: string | null
    abstract: string | null
    body: string | null

    mainImage?: Asset | null
    client_id: number | null
    category_id: number | null

    created_at: string | null
    updated_at: string | null
}

export class CasestudyData implements Casestudy {
    id: number | null
    titolo: string | null
    abstract: string | null
    body: string | null

    mainImage?: Asset | null
    client_id: number | null
    category_id: number | null

    created_at: string | null
    updated_at: string | null

    constructor(item?: Casestudy) {
        this.id = item?.id ?? null
        this.titolo = item?.titolo ?? null
        this.abstract = item?.abstract ?? null
        this.body = item?.body ?? null

        this.mainImage = item?.mainImage ?? null
        this.client_id = item?.client_id ?? null
        this.category_id = item?.category_id ?? null

        this.created_at = item?.created_at ?? null
        this.updated_at = item?.updated_at ?? null
    }
}

export type CasestudyFormData = Omit<Casestudy, 'id' | 'created_at' | 'updated_at'>

export interface Pagination {
    totalItems: number
    totalPages: number
    currentPage: number
}

export interface SearchParam {
    field: string
    value: string
}
