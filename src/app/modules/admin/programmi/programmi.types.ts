import { Params } from '@angular/router'
import { FuseNavigationItem } from '@fuse/components/navigation'

export class Programmi implements FuseNavigationItem {
    id: string | null
    title: string | null
    subtitle: string | null
    type: 'aside' | 'basic' | 'collapsable' | 'divider' | 'group' | 'spacer'
    tooltip?: string
    link: string | null
    queryParams?: Params | null
    externalLink?: boolean
    target?: '_blank' | '_self' | '_parent' | '_top' | ''
    exactMatch?: boolean
    classes?: { title?: string; subtitle?: string; icon?: string; wrapper?: string }
    icon: string | null
    badge?: { title?: string; classes?: string }
    meta?: any

    // Custom properties
    active: boolean | null // Per noi rappresenta se mostrare o meno l'elemento
    order: number | null
    parent_id: string | null
    templates: string[]

    constructor(item?: any) {
        this.id = item?.id ?? null
        this.title = item?.title ?? null
        this.subtitle = item?.subtitle ?? null
        this.type = item?.type ?? 'basic'
        this.tooltip = item?.tooltip ?? null
        this.link = item?.link ?? null
        this.queryParams = item?.queryParams ?? null
        this.externalLink = item?.externalLink ?? false
        this.target = item?.target ?? null
        this.exactMatch = item?.exactMatch ?? false
        this.classes = item?.classes ?? null
        this.icon = item?.icon ?? null
        this.badge = item?.badge ?? null
        this.meta = item?.meta ?? null

        this.active = item?.active ?? true
        this.order = item?.order ?? 10
        this.parent_id = item?.parent_id ?? null
        this.templates = item?.templates ?? []
    }
}

export type ProgrammiFormData = Omit<Programmi, 'id' | 'created_at' | 'updated_at'>

export interface Pagination {
    totalItems: number
    totalPages: number
    currentPage: number
}

export interface SearchParam {
    field: string
    value: string
}
