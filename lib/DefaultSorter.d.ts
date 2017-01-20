import { OnInit } from "@angular/core";
import { DataTable } from "./DataTable";
export declare class DefaultSorter implements OnInit {
    private mfTable;
    sortBy: string;
    isSortedByMeAsc: boolean;
    isSortedByMeDesc: boolean;
    constructor(mfTable: DataTable);
    ngOnInit(): void;
    sort(): void;
}
