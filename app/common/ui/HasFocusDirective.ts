import {Directive, Input,Output, EventEmitter} from "angular2/core";

@Directive({
    selector: '[hasFocus]',
    host: {
        "(focus)": "setFocus(true)",
        "(blur)": "setFocus(false)"
    }
})
export class HasFocusDirective {
    @Input() hasFocus:boolean;
    @Output() hasFocusChange = new EventEmitter<boolean>();

    setFocus(active:boolean):void {
        this.hasFocusChange.emit(active);
    }
}