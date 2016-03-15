import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {DatePipe} from "angular2/common";
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {MfTable, MfSort} from 'mf-angular2-table/components';


@Component({
    selector: 'app',
    templateUrl: 'src/app.html',
    providers: [HTTP_PROVIDERS],
    directives: [MfTable,MfSort],
    pipes: [DatePipe]
})
export class App {

    private data = [];

    constructor(private http: Http) {
        http.get("/src/data.json")
            .subscribe((data)=>{
                this.data = data.json();
            });
    }

}

bootstrap(App);