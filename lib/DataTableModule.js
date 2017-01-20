"use strict";
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var DataTable_1 = require("./DataTable");
var DefaultSorter_1 = require("./DefaultSorter");
var Paginator_1 = require("./Paginator");
var BootstrapPaginator_1 = require("./BootstrapPaginator");
var DataTableModule = (function () {
    function DataTableModule() {
    }
    DataTableModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule
                    ],
                    declarations: [
                        DataTable_1.DataTable,
                        DefaultSorter_1.DefaultSorter,
                        Paginator_1.Paginator,
                        BootstrapPaginator_1.BootstrapPaginator
                    ],
                    exports: [
                        DataTable_1.DataTable,
                        DefaultSorter_1.DefaultSorter,
                        Paginator_1.Paginator,
                        BootstrapPaginator_1.BootstrapPaginator
                    ]
                },] },
    ];
    DataTableModule.ctorParameters = function () { return []; };
    return DataTableModule;
}());
exports.DataTableModule = DataTableModule;
//# sourceMappingURL=DataTableModule.js.map