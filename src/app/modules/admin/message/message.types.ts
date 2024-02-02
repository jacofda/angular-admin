export interface Message {
    id: number | null
    name: string | null
    email: string | null
    message: string | null
    phone: string | null
    company: string | null
    created_at: string | null
    updated_at: string | null
}

export class MessageData implements Message {
    id: number | null
    name: string | null
    email: string | null
    message: string | null
    phone: string | null
    company: string | null
    created_at: string | null
    updated_at: string | null

    constructor(item?: Message) {
        this.id = item?.id ?? null
        this.name = item?.name ?? null
        this.email = item?.email ?? null
        this.message = item?.message ?? null
        this.phone = item?.phone ?? null
        this.company = item?.company ?? null
        this.created_at = item?.created_at ?? null
        this.updated_at = item?.updated_at ?? null
    }
}

export type MessageFormData = Omit<Message, 'id' | 'created_at' | 'updated_at'>

export interface Pagination {
    totalItems: number
    totalPages: number
    currentPage: number
}

export interface SearchParam {
    field: string
    value: string
}
