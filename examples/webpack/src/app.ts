import 'angular2/bundles/angular2-polyfills';
import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HelloWorld} from 'angular2-library-example/components';


@Component({
    selector: 'app',
    directives: [HelloWorld],
    template: `<div>
                   <input (keyup)="onKeyUp(input)" #input placeholder="Type Here">
                   {{message}}
                   <hello-world></hello-world>
               </div>`
})
export class App {

    message = "";

    onKeyUp(input) {
        this.message = input.value;
    }

}


bootstrap(App);