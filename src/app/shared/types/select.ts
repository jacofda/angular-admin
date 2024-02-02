export class Select {
    value: any
    items: any[]

    constructor(value?: any, items?: any[]) {
        this.value = value
        this.items = items || []
    }
}
