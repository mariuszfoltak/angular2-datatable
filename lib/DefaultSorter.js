"use strict";
var core_1 = require("@angular/core");
var DataTable_1 = require("./DataTable");
var DefaultSorter = (function () {
    function DefaultSorter(mfTable) {
        this.mfTable = mfTable;
        this.isSortedByMeAsc = false;
        this.isSortedByMeDesc = false;
    }
    DefaultSorter.prototype.ngOnInit = function () {
        var _this = this;
        this.mfTable.onSortChange.subscribe(function (event) {
            _this.isSortedByMeAsc = (event.sortBy == _this.sortBy && event.sortOrder == "asc");
            _this.isSortedByMeDesc = (event.sortBy == _this.sortBy && event.sortOrder == "desc");
        });
    };
    DefaultSorter.prototype.sort = function () {
        if (this.isSortedByMeAsc) {
            this.mfTable.setSort(this.sortBy, "desc");
        }
        else {
            this.mfTable.setSort(this.sortBy, "asc");
        }
    };
    DefaultSorter.decorators = [
        { type: core_1.Component, args: [{
                    selector: "mfDefaultSorter",
                    template: "\n        <a style=\"cursor: pointer\" (click)=\"sort()\" class=\"text-nowrap\">\n            <ng-content></ng-content>\n            <span *ngIf=\"isSortedByMeAsc\" class=\"glyphicon glyphicon-triangle-top\" aria-hidden=\"true\"></span>\n            <span *ngIf=\"isSortedByMeDesc\" class=\"glyphicon glyphicon-triangle-bottom\" aria-hidden=\"true\"></span>\n        </a>"
                },] },
    ];
    DefaultSorter.ctorParameters = function () { return [
        { type: DataTable_1.DataTable, },
    ]; };
    DefaultSorter.propDecorators = {
        'sortBy': [{ type: core_1.Input, args: ["by",] },],
    };
    return DefaultSorter;
}());
exports.DefaultSorter = DefaultSorter;
//# sourceMappingURL=DefaultSorter.js.map