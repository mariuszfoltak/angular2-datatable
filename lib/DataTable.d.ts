import { EventEmitter, SimpleChange, OnChanges, DoCheck, IterableDiffers } from "@angular/core";
import { ReplaySubject } from "rxjs/Rx";
export interface SortEvent {
    sortBy: string | string[];
    sortOrder: string;
}
export interface PageEvent {
    activePage: number;
    rowsOnPage: number;
    dataLength: number;
}
export interface DataEvent {
    length: number;
}
export declare class DataTable implements OnChanges, DoCheck {
    private differs;
    private diff;
    inputData: any[];
    sortBy: string | string[];
    sortOrder: string;
    sortByChange: EventEmitter<string | string[]>;
    sortOrderChange: EventEmitter<string>;
    rowsOnPage: number;
    activePage: number;
    private mustRecalculateData;
    data: any[];
    onSortChange: ReplaySubject<SortEvent>;
    onPageChange: EventEmitter<PageEvent>;
    constructor(differs: IterableDiffers);
    getSort(): SortEvent;
    setSort(sortBy: string | string[], sortOrder: string): void;
    getPage(): PageEvent;
    setPage(activePage: number, rowsOnPage: number): void;
    private calculateNewActivePage(previousRowsOnPage, currentRowsOnPage);
    private recalculatePage();
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): any;
    ngDoCheck(): any;
    private fillData();
    private caseInsensitiveIteratee(sortBy);
}
