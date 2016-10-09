import {NgModule} from "@angular/core";
import {AppComponent} from "./AppComponent";
import {BrowserModule} from "@angular/platform-browser";
import {DataTableModule} from "angular2-datatable";
import {HttpModule} from "@angular/http";
import {DataFilterPipe} from "./DataFilterPipe";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        BrowserModule,
        DataTableModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        DataFilterPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}