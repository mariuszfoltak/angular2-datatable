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
    @Input("id") private id: string;
    @Input("by") private sortBy: string;

    private isSortedByMeAsc: boolean = false;
    private isSortedByMeDesc: boolean = false;

    public constructor(private mfTable: DataTable) {
        mfTable.onSortChange.subscribe((event:SortEvent) => {
            this.isSortedByMeAsc = (event.id === this.id && event.sortOrder === "asc");
            this.isSortedByMeDesc = (event.id === this.id && event.sortOrder === "desc");
            if (event.id === this.id) {
                mfTable.setSortBy(this.sortBy);
            }
        })
    }

    private sort() {
        if(this.isSortedByMeAsc) {
            this.mfTable.setSortBy(this.sortBy);
            this.mfTable.setSort(this.id, "desc");
        } else {
            this.mfTable.setSort(this.id, "asc");
        }
    }
}