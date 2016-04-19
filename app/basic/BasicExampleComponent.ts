import {Component} from "angular2/core";
import template from "./BasicExampleComponent.html!text";
import data from "../data/basic-city-area-and-population.json!";
import {DataTableDirectives} from "angular2-datatable/datatable";

@Component({
    template: template,
    directives: [DataTableDirectives]
})
export class BasicExampleComponent {
    private data: any[] = data;
}
