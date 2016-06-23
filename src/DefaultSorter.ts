import {Component, Input} from "@angular/core";
import {DataTable, SortEvent} from "./DataTable";

@Component({
    selector: "mfDefaultSorter",
    template: `
        <a style="cursor: pointer" (click)="sort()" class="text-nowrap">
            <ng-content></ng-content>
            <span *ngIf="isSortedByMeAsc" class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>
            <span *ngIf="isSortedByMeDesc" class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
        </a>`
})
export class DefaultSorter {
    @Input("by") private sortBy: string;

    private isSortedByMeAsc: boolean = false;
    private isSortedByMeDesc: boolean = false;

    public constructor(private mfTable: DataTable) {
        mfTable.onSortChange.subscribe((event:SortEvent) => {
            this.isSortedByMeAsc = (event.sortBy.toString() === this.sortBy.toString() && event.sortOrder === "asc");
            this.isSortedByMeDesc = (event.sortBy.toString() === this.sortBy.toString() && event.sortOrder === "desc");
        })
    }

    private sort() {
        if(this.isSortedByMeAsc) {
            this.mfTable.setSort(this.sortBy, "desc");
        } else {
            this.mfTable.setSort(this.sortBy, "asc");
        }
    }
}