import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {DatePipe} from "angular2/common";
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {MfTable, MfDefaultSorter, MfDefaultPaginator} from 'mf-angular2-table/components';


@Component({
    selector: 'app',
    templateUrl: 'src/app.html',
    providers: [HTTP_PROVIDERS],
    directives: [MfTable, MfDefaultSorter, MfDefaultPaginator],
    pipes: [DatePipe]
})
export class App {

    private data = [];
    private activePage = 1;
    private rowsOnPage = 8;

    constructor(private http: Http) {
        http.get("/src/data.json")
            .subscribe((data)=>{
                this.data = data.json();
            });
    }

    private toInt(num:string) {
        return +num;
    }

}

bootstrap(App);