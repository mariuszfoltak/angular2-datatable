import 'zone.js';
import 'reflect-metadata';
import 'json.date-extensions';
import 'rxjs/Rx';

import {provide, enableProdMode} from "angular2/core";
import {bootstrap} from 'angular2/platform/browser';

import {AppComponent} from './AppComponent';
import {APP_CONFIG, Config} from "./common/config/AppConfig";

declare var CONFIG : Config;

if(CONFIG.prodMode) {
    enableProdMode();
}

bootstrap(AppComponent, [provide(APP_CONFIG, {useValue: CONFIG})]);