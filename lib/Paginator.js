"use strict";
var core_1 = require("@angular/core");
var DataTable_1 = require("./DataTable");
var Paginator = (function () {
    function Paginator(injectMfTable) {
        var _this = this;
        this.injectMfTable = injectMfTable;
        this.dataLength = 0;
        this.onPageChangeSubscriber = function (event) {
            _this.activePage = event.activePage;
            _this.rowsOnPage = event.rowsOnPage;
            _this.dataLength = event.dataLength;
            _this.lastPage = Math.ceil(_this.dataLength / _this.rowsOnPage);
        };
    }
    Paginator.prototype.ngOnChanges = function (changes) {
        this.mfTable = this.inputMfTable || this.injectMfTable;
        this.onPageChangeSubscriber(this.mfTable.getPage());
        this.mfTable.onPageChange.subscribe(this.onPageChangeSubscriber);
    };
    Paginator.prototype.setPage = function (pageNumber) {
        this.mfTable.setPage(pageNumber, this.rowsOnPage);
    };
    Paginator.prototype.setRowsOnPage = function (rowsOnPage) {
        this.mfTable.setPage(this.activePage, rowsOnPage);
    };
    Paginator.decorators = [
        { type: core_1.Component, args: [{
                    selector: "mfPaginator",
                    template: "<ng-content></ng-content>"
                },] },
    ];
    Paginator.ctorParameters = function () { return [
        { type: DataTable_1.DataTable, decorators: [{ type: core_1.Optional },] },
    ]; };
    Paginator.propDecorators = {
        'inputMfTable': [{ type: core_1.Input, args: ["mfTable",] },],
    };
    return Paginator;
}());
exports.Paginator = Paginator;
//# sourceMappingURL=Paginator.js.map