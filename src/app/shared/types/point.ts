export interface Point {
    type: string
    coordinates: number[]
}

export class PointData implements Point {
    type: string
    coordinates: number[]

    constructor(coordinates?: number[]) {
        this.type = 'Point'
        this.coordinates = coordinates ?? []
    }
}