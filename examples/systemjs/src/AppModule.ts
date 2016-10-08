import {NgModule} from "@angular/core";
import {AppComponent} from "./AppComponent";
import {BrowserModule} from "@angular/platform-browser";
import {DataTableModule} from "angular2-datatable";
import {HttpModule} from "@angular/http";

@NgModule({
    imports: [
        BrowserModule,
        DataTableModule,
        HttpModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {

}