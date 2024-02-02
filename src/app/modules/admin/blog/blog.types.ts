import { Asset } from 'app/shared/types/asset'

export interface Blog {
    id: number | null
    titolo: string | null
    abstract: string | null
    body: string | null
    created_at: string | null
    updated_at: string | null
    published_at: string | null
    mainImage?: Asset | null
}

export class BlogData implements Blog {
    id: number | null
    titolo: string | null
    abstract: string | null
    body: string | null
    created_at: string | null
    updated_at: string | null
    published_at: string | null
    mainImage?: Asset | null

    constructor(item?: Blog) {
        this.id = item?.id ?? null
        this.titolo = item?.titolo ?? null
        this.abstract = item?.abstract ?? null
        this.body = item?.body ?? null
        this.created_at = item?.created_at ?? null
        this.updated_at = item?.updated_at ?? null
        this.published_at = item?.published_at ?? null
        this.mainImage = item?.mainImage ?? null
    }
}

export type BlogFormData = Omit<Blog, 'id' | 'created_at' | 'updated_at'>

export interface Pagination {
    totalItems: number
    totalPages: number
    currentPage: number
}

export interface SearchParam {
    field: string
    value: string
}
