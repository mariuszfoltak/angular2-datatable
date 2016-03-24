import {Component, provide} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS, BrowserXhr} from 'angular2/http';

import {ApiService} from "./common/api/ApiService";
import {CORSBrowserXHR} from "./common/hack/CORSBrowserXHR";

import {Page1Component} from "./page1/Page1Component";
import {Page2Component} from "./page2/Page2Component";

import template from './AppComponent.html!text';

@Component({
    selector: 'app',
    template: template,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        ApiService,
        provide(BrowserXhr, {useClass: CORSBrowserXHR})
    ]
})

@RouteConfig([
    {path: '/page1', component: Page1Component, name: 'PageOne'},
    {path: '/page2', component: Page2Component, name: 'PageTwo'},
    {path: '/**', redirectTo: ['PageOne']}
])
export class AppComponent { }

