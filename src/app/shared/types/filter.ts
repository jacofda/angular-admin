export interface Filter {
    name: string
    label: string
    type: string
    placeholder: string
    size: string,
    child: boolean

    // Campi per i filtri di tipo select
    options?: any[]
    track_value?: string
    track_label?: string
}
