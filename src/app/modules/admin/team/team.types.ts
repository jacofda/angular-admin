import { Asset } from 'app/shared/types/asset'

export interface Team {
    id: number | null
    name: string | null
    position: string | null
    group: string | null
    linkedIn: string | null
    emoji: string | null
    order: number | null
    mainImage: Asset | null
    created_at: string | null
    updated_at: string | null
}

export class TeamData implements Team {
    id: number | null
    name: string | null
    position: string | null
    group: string | null
    linkedIn: string | null
    emoji: string | null
    order: number | null
    mainImage: Asset | null
    created_at: string | null
    updated_at: string | null

    constructor(item?: Team) {
        this.id = item?.id ?? null
        this.name = item?.name ?? null
        this.position = item?.position ?? null
        this.group = item?.group ?? null
        this.linkedIn = item?.linkedIn ?? null
        this.emoji = item?.emoji ?? null
        this.order = item?.order ?? null
        this.mainImage = item?.mainImage ?? null
        this.created_at = item?.created_at ?? null
        this.updated_at = item?.updated_at ?? null
    }
}

export type TeamFormData = Omit<Team, 'id' | 'created_at' | 'updated_at'>

export interface Pagination {
    totalItems: number
    totalPages: number
    currentPage: number
}

export interface SearchParam {
    field: string
    value: string
}
