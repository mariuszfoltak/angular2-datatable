import {Component, OnInit, Input, Output, EventEmitter} from "angular2/core";
import {DataTable} from "./DataTable";
import {Paginator} from "./Paginator";

@Component({
    selector: "mfBootstrapPaginator",
    template: `
    <mfPaginator #p [rowsOnPage]="rowsOnPage" (rowsOnPageChange)="changeRowsOnPage($event)" [mfTable]="mfTable"
                    [activePage]="activePage" (activePageChange)="changeActivePage($event)">
        <nav class="pagination" *ngIf="p.lastPage>1">
            <li [class.disabled]="activePage <= 1" (click)="activePage = 1">
                <a href="#">&laquo;</a>
            </li>
            <li *ngIf="activePage > 4 && activePage + 1 > p.lastPage" (click)="activePage = activePage - 4">
                <a href="#">{{activePage-4}}</a>
            </li>
            <li *ngIf="activePage > 3 && activePage + 2 > p.lastPage" (click)="activePage = activePage - 3">
                <a href="#">{{activePage-3}}</a>
            </li>
            <li *ngIf="activePage > 2" (click)="activePage = activePage - 2">
                <a href="#">{{activePage-2}}</a>
            </li>
            <li *ngIf="activePage > 1" (click)="activePage = activePage - 1">
                <a href="#">{{activePage-1}}</a>
            </li>
            <li class="active">
                <a href="#">{{activePage}}</a>
            </li>
            <li *ngIf="activePage + 1 <= p.lastPage" (click)="activePage = activePage + 1">
                <a href="#">{{activePage+1}}</a>
            </li>
            <li *ngIf="activePage + 2 <= p.lastPage" (click)="activePage = activePage + 2">
                <a href="#">{{activePage+2}}</a>
            </li>
            <li *ngIf="activePage + 3 <= p.lastPage && activePage < 3" (click)="activePage = activePage + 3">
                <a href="#">{{activePage+3}}</a>
            </li>
            <li *ngIf="activePage + 4 <= p.lastPage && activePage < 2" (click)="activePage = activePage + 4">
                <a href="#">{{activePage+4}}</a>
            </li>
            <li [class.disabled]="activePage >= p.lastPage" (click)="activePage = p.lastPage">
                <a href="#">&raquo;</a>
            </li>
        </nav>
        <nav class="pagination pull-right">
            <li *ngFor="#rows of rowsOnPageSet" [class.active]="rowsOnPage===rows" (click)="changeRowsOnPage(rows)">
                <a href="#">{{rows}}</a>
            </li>
        </nav>
    </mfPaginator>
    `,
    directives: [[Paginator]]
})
export class BootstrapPaginator {
    @Input("rowsOnPageSet") private rowsOnPageSet = [];
    @Input("rowsOnPage") private rowsOnPage;
    @Input("activePage") private activePage = 1;
    @Input("mfTable") private mfTable: DataTable;

    @Output("rowsOnPageChange") private onRowsPageChange = new EventEmitter<number>();
    @Output("activePageChange") private onActivePageChange = new EventEmitter<number>();

    private addToActivePage(num:number):void {
        this.changeActivePage(this.activePage+num);
    }

    private changeActivePage(num:number):void {
        this.activePage = num;
        this.onActivePageChange.emit(num);
    }

    private changeRowsOnPage(num:number):void {
        this.rowsOnPage = num;
        this.onRowsPageChange.emit(num);
    }
}