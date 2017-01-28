import { SimpleChange, OnChanges } from "@angular/core";
import { DataTable } from "./DataTable";
export declare class Paginator implements OnChanges {
    private injectMfTable;
    inputMfTable: DataTable;
    private mfTable;
    activePage: number;
    rowsOnPage: number;
    dataLength: number;
    lastPage: number;
    constructor(injectMfTable: DataTable);
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): any;
    setPage(pageNumber: number): void;
    setRowsOnPage(rowsOnPage: number): void;
    private onPageChangeSubscriber;
}
