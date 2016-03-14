import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {TableDirective} from 'mf-angular2-table/components';


@Component({
    selector: 'app',
    templateUrl: 'src/app.html',
    directives: [TableDirective]
})
export class App {

    public data:any[] = [
        {
            name: 'abc',
            score: 3,
            abec: '123'
        },
        {
            name: 'def',
            score: 4,
            abec: '456'
        },
        {
            name: 'ghi',
            score: 5,
            abec: '678'
        },
        {
            name: 'jkl',
            score: 6,
            abec: '789'
        }
    ];

}

bootstrap(App);