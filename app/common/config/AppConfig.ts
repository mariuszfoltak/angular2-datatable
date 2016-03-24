import {OpaqueToken} from 'angular2/core';

export let APP_CONFIG = new OpaqueToken('app.config');

export interface Config {
    apiEndpoint: string;
    prodMode: boolean;
}