import {Directive, Input, EventEmitter, SimpleChange, OnInit, OnChanges, DoCheck} from "@angular/core";
import * as _ from "lodash";

export interface SortEvent {
    id: string;
    sortOrder: string
}

export interface PageEvent {
    activePage: number;
    rowsOnPage: number;
    dataLength: number;
}

export interface DataEvent {
    length: number;
}

@Directive({
    selector: 'table[mfData]',
    exportAs: 'mfDataTable'
})
export class DataTable implements OnInit, OnChanges, DoCheck {

    @Input() public id: string;
    @Input("mfData") public inputData:any[] = [];

    private sortById = "";
    private sortBy = "";
    private sortOrder = "asc";

    @Input("mfRowsOnPage") public rowsOnPage = 1000;
    @Input("mfActivePage") public activePage = 1;
    @Input("mfSaveState") public saveState = false;

    private mustRecalculateData = false;

    public data: any[];

    public onDataChange = new EventEmitter<DataEvent>();
    public onSortChange = new EventEmitter<SortEvent>();
    public onPageChange = new EventEmitter<PageEvent>();

    public getSort():SortEvent {
        return {id: this.sortById, sortOrder: this.sortOrder};
    }

    public setSort(id: string, sortOrder:string):void {
        if (this.sortById !== id || this.sortOrder !== sortOrder) {
            this.sortById = id;
            this.sortOrder = sortOrder;
            this.mustRecalculateData = true;
            this.onSortChange.emit({id: id, sortOrder: sortOrder});
        }
    }
    
    public setSortBy(sortBy: string) {
        this.sortBy = sortBy;
        this.mustRecalculateData = true;
    }

    public getPage():PageEvent {
        return {activePage: this.activePage, rowsOnPage: this.rowsOnPage, dataLength: this.inputData.length};
    }

    public setPage(activePage:number, rowsOnPage:number):void {
        if (this.rowsOnPage !== rowsOnPage || this.activePage !== activePage) {
            this.activePage = this.activePage !== activePage ? activePage : this.calculateNewActivePage(this.rowsOnPage, rowsOnPage);
            this.rowsOnPage = rowsOnPage;
            this.mustRecalculateData = true;
            this.onPageChange.emit({activePage: this.activePage, rowsOnPage: this.rowsOnPage, dataLength: this.inputData.length});
        }
    }

    private calculateNewActivePage(previousRowsOnPage:number, currentRowsOnPage:number):number {
        let firstRowOnPage = (this.activePage - 1) * previousRowsOnPage + 1;
        let newActivePage = Math.ceil(firstRowOnPage / currentRowsOnPage);
        return newActivePage;
    }

    public ngOnInit() {
        if (this.saveState) {
            if (this.id === null) {
                throw new Error('id is required if state saving is enabled');
            }
            this.loadState();
        }
    }

    public ngOnChanges(changes:{[key:string]:SimpleChange}):any {
        if (changes["inputData"]) {
            this.inputData = this.inputData || [];
            if (this.activePage > this.inputData.length / this.rowsOnPage) {
                this.activePage = 1;
            }
            this.onPageChange.emit({
                activePage: this.activePage,
                rowsOnPage: this.rowsOnPage,
                dataLength: this.inputData.length
            });
            this.mustRecalculateData = true;
        }
    }

    public ngDoCheck():any {
        if (this.mustRecalculateData) {
            this.fillData();
            this.mustRecalculateData = false;
        }
    }

    private fillData():void {
        this.activePage = this.activePage;
        this.rowsOnPage = this.rowsOnPage;

        let offset = (this.activePage - 1) * this.rowsOnPage;
        let data = this.inputData;
        data = _.orderBy(data, [this.sortBy], [this.sortOrder]);
        data = _.slice(data, offset, offset + this.rowsOnPage);
        this.data = data;

        if (this.saveState) {
            this.doSaveState();
        }
    }

    private doSaveState() {
        localStorage.setItem(this.id + '.activePage', this.activePage.toString());
        localStorage.setItem(this.id + '.rowsOnPage', this.rowsOnPage.toString());
        localStorage.setItem(this.id + '.sortById', this.sortById);
        localStorage.setItem(this.id + '.sortOrder', this.sortOrder);
    }

    private loadState() {
        let activePage, rowsOnPage, sortById, sortOrder;

        let value = localStorage.getItem(this.id + '.activePage');
        if (value) {
            activePage = +value;
        }
        value = localStorage.getItem(this.id + '.rowsOnPage');
        if (value) {
            rowsOnPage = +value;
        }
        value = localStorage.getItem(this.id + '.sortById');
        if (value) {
            sortById = value;
        }
        value = localStorage.getItem(this.id + '.sortOrder');
        if (value) {
            sortOrder = value;
        }

        if (activePage && rowsOnPage) {
            this.setPage(activePage, rowsOnPage);
        }
        if (sortById && sortOrder) {
            this.setSort(sortById, sortOrder);
        }
    }
}