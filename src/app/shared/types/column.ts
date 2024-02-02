export interface Column {
    name: string
    key: string
    label: string
    sortField: string
    type?: string
    visible: boolean
    main: boolean
    child: boolean,
    width?: number
}
