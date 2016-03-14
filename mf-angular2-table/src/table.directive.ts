import {
    Directive,
    Input,
    OnInit
} from "../../examples/systemjs/node_modules/angular2/core.d";

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

    public sort(sortBy: any) {
        this.data = _.sortBy(this.userData, sortBy);
    }
}