import {Component, provide} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS, BrowserXhr} from 'angular2/http';
import {DROPDOWN_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";

import {ApiService} from "./common/api/ApiService";
import {CORSBrowserXHR} from "./common/hack/CORSBrowserXHR";

import {BasicSortingComponent} from "./sorting/BasicSortingComponent";
import {Page2Component} from "./page2/Page2Component";

import template from './AppComponent.html!text';
import {BasicExampleComponent} from "./basic/BasicExampleComponent";

@Component({
    selector: 'app',
    template: template,
    directives: [ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES],
    providers: [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        ApiService,
        provide(BrowserXhr, {useClass: CORSBrowserXHR})
    ]
})

@RouteConfig([
    {path: '/basic', component: BasicExampleComponent, name: 'BasicExample'},
    {path: '/**', redirectTo: ['BasicExample']}
])
export class AppComponent { }

