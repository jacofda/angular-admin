export class Asset {
    public id: number = null;
    public assetableId: number = null;
    public assetableType: string = null;
    public assetableField: string = null;
    public name: string = null;
    public path: string = null;
    public type?: string = null;
    public originalName: string = null;
    public deleted?: boolean = false;
    public ordine?: number = null;

    constructor(object: AssetInterface = null) {
        if(object) {
            this.id = object.id;
            this.assetableId = object.assetableId;
            this.assetableType = object.assetableType;
            this.assetableField = object.assetableField;
            this.name = object.name;
            this.path = object.path;
            this.originalName = object.originalName;
            this.ordine = object.ordine;
        }
    }
}

export interface AssetInterface {
    id: number;
    assetableId: number;
    assetableType: string;
    assetableField: string;
    name: string;
    path: string;
    originalName: string;
    ordine?: number;
}
