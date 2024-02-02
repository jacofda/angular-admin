export interface Items {
    folders: Item[]
    files: Item[]
    path: any[]
}

export interface Item {
    id?: string
    folderId?: string
    name: string
    path: string
    createdBy?: string
    createdAt?: string
    modifiedAt?: string
    size?: string
    type?: string
    loading?: boolean
    selected?: boolean
    contents?: string | null
    description?: string | null
}

export type ImageSize = 128 | 256 | 512 | 1024 | 2048
