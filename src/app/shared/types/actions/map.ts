export class ActionComponentMap {
    private key: string
    private _map: Array<any> = []

    constructor(key: string) {
        this.key = key
    }

    public getComponent() {
        return this._map.find((item) => {
            return item.key === this.key
        }).component
    }
}
