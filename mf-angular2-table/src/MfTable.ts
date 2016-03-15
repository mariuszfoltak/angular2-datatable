import {
    Directive,
    Input,
    OnChanges
} from "angular2/core";

@Directive({
    selector: 'table[mfTable]',
    exportAs: 'mfTable'
})
export class MfTable implements OnChanges {

    @Input("mfTable") private userData:any[] = [];

    public data;

    public sortingOptions:{by: string, order: string} = {by: "", order: "asc"};

    public ngOnChanges(changes:{}):any {
        this.fillData();
    }

    public sort(sortBy:string):void {
        if (this.sortingOptions.by === sortBy) {
            this.sortingOptions.order = this.sortingOptions.order === "asc" ? "desc" : "asc";
        } else {
            this.sortingOptions.by = sortBy;
            this.sortingOptions.order = "asc";
        }

        this.fillData();
    }

    private fillData():void {
        this.data = _.orderBy(this.userData, [this.sortingOptions.by], [this.sortingOptions.order]);
    }
}