import { Asset } from 'app/shared/types/asset'

export interface Client {
    id: number | null
    titolo: string | null
    website: string | null
    mainImage: Asset | null
    isInSlide: boolean | null
    created_at: string | null
    updated_at: string | null
}

export class ClientData implements Client {
    id: number | null
    titolo: string | null
    website: string | null
    mainImage: Asset | null
    isInSlide: boolean | null
    created_at: string | null
    updated_at: string | null

    constructor(item?: Client) {
        this.id = item?.id ?? null
        this.titolo = item?.titolo ?? null
        this.website = item?.website ?? null
        this.mainImage = item?.mainImage ?? null
        this.isInSlide = item?.isInSlide ?? null
        this.created_at = item?.created_at ?? null
        this.updated_at = item?.updated_at ?? null
    }
}

export type ClientFormData = Omit<Client, 'id' | 'created_at' | 'updated_at'>

export interface Pagination {
    totalItems: number
    totalPages: number
    currentPage: number
}

export interface SearchParam {
    field: string
    value: string
}
