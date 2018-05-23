import {
    Directive, Input, EventEmitter, SimpleChange, OnChanges, DoCheck, IterableDiffers,
    IterableDiffer, Output
} from "@angular/core";
import { ReplaySubject } from "rxjs";

export interface SortEvent {
    sortBy: string|string[];
    sortOrder: SortOrder
}

export interface PageEvent {
    activePage: number;
    rowsOnPage: number;
    dataLength: number;
}

export interface DataEvent {
    length: number;
}

export type SortOrder = "asc" | "desc";

@Directive({
    selector: "table[mfData]",
    exportAs: "mfDataTable"
})
export class DataTable implements OnChanges, DoCheck {

    private diff: IterableDiffer<any>;
    @Input("mfData") public inputData: any[] = [];

    @Input("mfSortBy") public sortBy: string|string[] = "";
    @Input("mfSortOrder") public sortOrder: SortOrder = "asc";
    @Output("mfSortByChange") public sortByChange = new EventEmitter<string|string[]>();
    @Output("mfSortOrderChange") public sortOrderChange = new EventEmitter<string>();

    @Input("mfRowsOnPage") public rowsOnPage = 1000;
    @Input("mfActivePage") public activePage = 1;

    private mustRecalculateData = false;

    public data: any[];

    public onSortChange = new ReplaySubject<SortEvent>(1);
    public onPageChange = new EventEmitter<PageEvent>();

    public constructor(private differs: IterableDiffers) {
        this.diff = differs.find([]).create(null);
    }

    public getSort(): SortEvent {
        return {sortBy: this.sortBy, sortOrder: this.sortOrder};
    }

    public setSort(sortBy: string|string[], sortOrder: SortOrder): void {
        if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = ["asc","desc"].indexOf(sortOrder) >= 0 ? sortOrder : "asc";
            this.mustRecalculateData = true;
            this.onSortChange.next({sortBy: this.sortBy, sortOrder: this.sortOrder});
            this.sortByChange.emit(this.sortBy);
            this.sortOrderChange.emit(this.sortOrder);
        }
    }

    public getPage(): PageEvent {
        return {activePage: this.activePage, rowsOnPage: this.rowsOnPage, dataLength: this.inputData.length};
    }

    public setPage(activePage: number, rowsOnPage: number): void {
        if (this.rowsOnPage !== rowsOnPage || this.activePage !== activePage) {
            this.activePage = this.activePage !== activePage ? activePage : this.calculateNewActivePage(this.rowsOnPage, rowsOnPage);
            this.rowsOnPage = rowsOnPage;
            this.mustRecalculateData = true;
            this.onPageChange.emit({
                activePage: this.activePage,
                rowsOnPage: this.rowsOnPage,
                dataLength: this.inputData ? this.inputData.length : 0
            });
        }
    }

    private calculateNewActivePage(previousRowsOnPage: number, currentRowsOnPage: number): number {
        const firstRowOnPage = (this.activePage - 1) * previousRowsOnPage + 1;
        const newActivePage = Math.ceil(firstRowOnPage / currentRowsOnPage);
        return newActivePage;
    }

    private recalculatePage() {
        const lastPage = Math.ceil(this.inputData.length / this.rowsOnPage);
        this.activePage = lastPage < this.activePage ? lastPage : this.activePage;
        this.activePage = this.activePage || 1;

        this.onPageChange.emit({
            activePage: this.activePage,
            rowsOnPage: this.rowsOnPage,
            dataLength: this.inputData.length
        });
    }

    public ngOnChanges(changes: {[key: string]: SimpleChange}): any {
        if (changes["rowsOnPage"]) {
            this.rowsOnPage = changes["rowsOnPage"].previousValue;
            this.setPage(this.activePage, changes["rowsOnPage"].currentValue);
            this.mustRecalculateData = true;
        }
        if (changes["sortBy"] || changes["sortOrder"]) {
            if (["asc", "desc"].indexOf(this.sortOrder) < 0) {
                console.warn("angular2-datatable: value for input mfSortOrder must be one of ['asc', 'desc'], but is:", this.sortOrder);
                this.sortOrder = "asc";
            }
            if (this.sortBy) {
                this.onSortChange.next({sortBy: this.sortBy, sortOrder: this.sortOrder});
            }
            this.mustRecalculateData = true;
        }
        if (changes["inputData"]) {
            this.inputData = changes["inputData"].currentValue || [];
            this.recalculatePage();
            this.mustRecalculateData = true;
        }
    }

    public ngDoCheck(): any {
        const changes = this.diff.diff(this.inputData);
        if (changes) {
            this.recalculatePage();
            this.mustRecalculateData = true;
        }
        if (this.mustRecalculateData) {
            this.fillData();
            this.mustRecalculateData = false;
        }
    }

    private fillData(): void {
        const offset = (this.activePage - 1) * this.rowsOnPage;
        let data = this.inputData;
        data = [...data].sort(this.sorter(this.sortBy, this.sortOrder));
        data = data.slice(offset, offset + this.rowsOnPage);
        this.data = data;
    }

    private caseInsensitiveIteratee(sortBy: string) {
        return (row: any): any => {
            let value = row;
            for (const sortByProperty of sortBy.split(".")) {
                if (value) {
                    value = value[sortByProperty];
                }
            }
            if (value && typeof value === "string" || value instanceof String) {
                return value.toLowerCase();
            }
            return value;
        };
    }

    private compare(left: any, right: any): number {
        return left === right ? 0 : left == null || left > right ? 1 : -1;
    }

    private sorter<T>(sortBy: string | string[], sortOrder: string): (left: T, right: T) => number {
        const order = sortOrder === "desc" ? -1 : 1;
        if (typeof sortBy === "string" || sortBy instanceof String) {
            const iteratee = this.caseInsensitiveIteratee(sortBy as string);
            return (left, right) => {
                return this.compare(iteratee(left), iteratee(right)) * order;
            };
        } else {
            const iteratees = sortBy.map(entry => this.caseInsensitiveIteratee(entry));
            return (left, right) => {
                for (const iteratee of iteratees) {
                    const comparison = this.compare(iteratee(left), iteratee(right)) * order;
                    if (comparison !== 0) {
                        return comparison;
                    }
                }
                return 0;
            };
        }
    }

}