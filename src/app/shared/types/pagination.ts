export class Pagination {
    public totalItems: number = 0;
    public currentPage: number = 0;
    public limit: number = 25;

    constructor(object = null) {
        if(object) {
            this.totalItems = object.totalItems;
            this.currentPage = object.currentPage;
            this.limit = object.limit;
        }
    }
}
