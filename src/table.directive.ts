import {
    Directive,
    Input,
    OnInit
} from "angular2/core";

@Directive({
    selector: 'table[mf-table]',
    exportAs: 'mfTable'
})
export class TableDirective implements OnInit {

    @Input("mf-table") private userData:any[] = [];

    public data;

    public ngOnInit() {
        this.data = this.userData;
    }
}