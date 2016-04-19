import {Component, Input, Output, SimpleChange, OnInit, OnChanges, EventEmitter, Optional} from "angular2/core";
import {DataTable, PageEvent, DataEvent} from "./DataTable";

@Component({
    selector: "mfPaginator",
    template: `<ng-content></ng-content>`,
    inputs: ['activePage', 'rowsOnPage']
})
export class Paginator implements OnInit, OnChanges {

    private mfTable:DataTable;
    private _activePage:number;
    private _rowsOnPage:number;

    public dataLength:number = 0;
    public lastPage:number;

    @Input("mfTable") private inputMfTable:DataTable;

    @Output("activePageChange") public onActivePageChange = new EventEmitter<number>();
    @Output("rowsOnPageChange") public onRowsOnPageChange = new EventEmitter<number>();

    public constructor(@Optional() private injectMfTable:DataTable) {
    }

    public ngOnChanges(changes:{[key:string]:SimpleChange}):any {
        this.mfTable = this.inputMfTable || this.injectMfTable;

        let rowsOnPage = changes["rowsOnPage"];
        let activePage = changes["activePage"];
        let rowsOnPageChanged = rowsOnPage && rowsOnPage.currentValue && rowsOnPage.currentValue !== this._rowsOnPage;
        let activePageChanged = activePage && activePage.currentValue && activePage.currentValue !== this._activePage;
        this._rowsOnPage = rowsOnPageChanged ? rowsOnPage.currentValue : this._rowsOnPage;
        this._activePage = activePageChanged ? activePage.currentValue : this._activePage;

        if (rowsOnPageChanged || activePageChanged) {
            let newActivePage = !activePageChanged ? this.calculateNewActivePage(rowsOnPage) : 0;
            this.mfTable.setPage(newActivePage || this._activePage, this._rowsOnPage);
            this.lastPage = Math.ceil(this.dataLength / this._rowsOnPage);
        }
    }

    public ngOnInit() {
        let page = this.mfTable.getPage();
        this.dataLength = page.dataLength;
        this.lastPage = Math.ceil(page.dataLength / this._rowsOnPage);
        this.mfTable.onDataChange.subscribe(this.onDataChangeSubscriber);
        this.mfTable.onPageChange.subscribe(this.onPageChangeSubscriber);
    }

    private calculateNewActivePage(rowsOnPage) {
        let firstRowOnPage = (this._activePage - 1) * rowsOnPage.previousValue + 1;
        let newActivePage = Math.ceil(firstRowOnPage / rowsOnPage.currentValue);
        return newActivePage;
    }

    private onPageChangeSubscriber = (event:PageEvent)=> {
        if (this._activePage !== event.activePage || this._rowsOnPage !== event.rowsOnPage) {
            this._activePage = event.activePage;
            this._rowsOnPage = event.rowsOnPage;
            this.onActivePageChange.emit(event.activePage);
            this.onRowsOnPageChange.emit(event.rowsOnPage);
            this.lastPage = Math.ceil(this.dataLength / this._rowsOnPage);
        }
    };

    private onDataChangeSubscriber = (event:DataEvent)=> {
        this.dataLength = event.length;
        this.lastPage = Math.ceil(event.length / this._rowsOnPage);
    };
}