import {Input, OnInit, Directive, ElementRef} from "angular2/core";
//noinspection TypeScriptCheckImport
import resizable from 'components/jqueryui/ui/resizable';

@Directive({
    selector: "[ui-resizable]"
})
export class Resizable implements OnInit {
    @Input("ui-resizable") config: any;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        resizable(this.config, this.el.nativeElement);
    }
}