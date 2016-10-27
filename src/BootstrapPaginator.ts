import {Component, Input, OnChanges} from "@angular/core";
import {DataTable} from "./DataTable";
import * as _ from "lodash";

@Component({
    selector: "mfBootstrapPaginator",
    template: `
    <mfPaginator #p [mfTable]="mfTable">
        <nav class="pagination" *ngIf="p.dataLength > p.rowsOnPage">
            <li [class.disabled]="p.activePage <= 1" (click)="p.setPage(1)">
                <a style="cursor: pointer">&laquo;</a>
            </li>
            <li *ngIf="p.activePage > 4 && p.activePage + 1 > p.lastPage" (click)="p.setPage(p.activePage - 4)">
                <a style="cursor: pointer">{{p.activePage-4}}</a>
            </li>
            <li *ngIf="p.activePage > 3 && p.activePage + 2 > p.lastPage" (click)="p.setPage(p.activePage - 3)">
                <a style="cursor: pointer">{{p.activePage-3}}</a>
            </li>
            <li *ngIf="p.activePage > 2" (click)="p.setPage(p.activePage - 2)">
                <a style="cursor: pointer">{{p.activePage-2}}</a>
            </li>
            <li *ngIf="p.activePage > 1" (click)="p.setPage(p.activePage - 1)">
                <a style="cursor: pointer">{{p.activePage-1}}</a>
            </li>
            <li class="active">
                <a style="cursor: pointer">{{p.activePage}}</a>
            </li>
            <li *ngIf="p.activePage + 1 <= p.lastPage" (click)="p.setPage(p.activePage + 1)">
                <a style="cursor: pointer">{{p.activePage+1}}</a>
            </li>
            <li *ngIf="p.activePage + 2 <= p.lastPage" (click)="p.setPage(p.activePage + 2)">
                <a style="cursor: pointer">{{p.activePage+2}}</a>
            </li>
            <li *ngIf="p.activePage + 3 <= p.lastPage && p.activePage < 3" (click)="p.setPage(p.activePage + 3)">
                <a style="cursor: pointer">{{p.activePage+3}}</a>
            </li>
            <li *ngIf="p.activePage + 4 <= p.lastPage && p.activePage < 2" (click)="p.setPage(p.activePage + 4)">
                <a style="cursor: pointer">{{p.activePage+4}}</a>
            </li>
            <li [class.disabled]="p.activePage >= p.lastPage" (click)="p.setPage(p.lastPage)">
                <a style="cursor: pointer">&raquo;</a>
            </li>
        </nav>
        <nav class="pagination pull-right" *ngIf="p.dataLength > minRowsOnPage">
            <li *ngFor="let rows of rowsOnPageSet" [class.active]="p.rowsOnPage===rows" (click)="p.setRowsOnPage(rows)">
                <a style="cursor: pointer">{{rows}}</a>
            </li>
        </nav>
    </mfPaginator>
    `
})
export class BootstrapPaginator implements OnChanges {
    @Input("rowsOnPageSet") rowsOnPageSet = [];
    @Input("mfTable") mfTable: DataTable;

    minRowsOnPage = 0;

    ngOnChanges(changes:any):any {
        if(changes.rowsOnPageSet) {
            this.minRowsOnPage = _.min(this.rowsOnPageSet)
        }
    }
}