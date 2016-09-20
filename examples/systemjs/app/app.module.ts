import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {DataTableDirectives} from '@lehphyro/angular2-datatable/datatable';
import {App} from './app';

@NgModule({
    imports: [BrowserModule, HttpModule],
    declarations: [App, DataTableDirectives],
    bootstrap: [App]
})
export class AppModule {
}
