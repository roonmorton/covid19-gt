export class GoogleChartModel{
    title: string;
    type: string;
    data: Array<Array<any>>;
    options: any;
    columnNames: Array<string>;

    constructor(type: string, data: Array<Array<any>>, columnNames: Array<string>,options?: any, title?: string,){
        this.type = type;
        this.data = data;
        this.title = title || "";
        this.columnNames = columnNames;
        this.options = options || {};
    }
}

