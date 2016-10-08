import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {DataTable} from "./DataTable";
import {DefaultSorter} from "./DefaultSorter";
import {Paginator} from "./Paginator";
import {BootstrapPaginator} from "./BootstrapPaginator";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DataTable,
        DefaultSorter,
        Paginator,
        BootstrapPaginator
    ],
    exports: [
        DataTable,
        DefaultSorter,
        Paginator,
        BootstrapPaginator
    ]
})
export class DataTableModule {

}