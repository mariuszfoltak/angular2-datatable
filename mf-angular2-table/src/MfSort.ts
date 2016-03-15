import {Component, Input} from "angular2/src/core/metadata";
import {MfTable} from "./MfTable";

@Component({
    selector: "mfSort",
    template: `
        <a href="#" (click)="mfTable.sort(sortBy)" class="text-nowrap">
            <ng-content></ng-content>
            <span *ngIf="sortedByMe('asc')" class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>
            <span *ngIf="sortedByMe('desc')" class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
        </a>`
})
export class MfSort {
    @Input("by") private sortBy: string;

    public constructor(private mfTable: MfTable) {}

    private sortedByMe(order: "asc"|"desc") {
        let sortingOptions = this.mfTable.sortingOptions;
        return sortingOptions.by === this.sortBy && sortingOptions.order === order;
    }
}