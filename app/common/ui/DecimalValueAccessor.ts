import {Directive, Renderer, ElementRef, Self, forwardRef, Provider} from 'angular2/core';

import {NG_VALUE_ACCESSOR, DefaultValueAccessor } from 'angular2/common';
import {CONST_EXPR} from 'angular2/src/facade/lang';
import {NgControl} from "angular2/common";
import {HostListener} from "angular2/core";
import {Input} from "angular2/core";
import {OnInit} from "angular2/core";

const PROVIDER = CONST_EXPR(new Provider(
    NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => DecimalValueAccessor), multi: true}));

@Directive({
    selector: 'input[format-decimal]',
    bindings: [PROVIDER]
})
export class DecimalValueAccessor extends DefaultValueAccessor implements OnInit {
    @Input("format-decimal") fractionDigits = "2";
    private currentValue:any = null;

    constructor(_renderer:Renderer, _elementRef:ElementRef) {
        super(_renderer, _elementRef);
    }
    ngOnInit():any {
        this.writeValue(this.currentValue);
    }

    @HostListener('blur')
    public blur() {
        this.onTouched();
        this.writeValue(this.currentValue);
    }

    @HostListener('input', ['$event.target.value'])
    public input(value:string) {

        if (value) {
            let decimalValue = Number(value.replace(",", "."));
            if (!isNaN(decimalValue)) {
                this.changeValue(decimalValue);
                return;
            }
        }

        this.changeValue(value);
    }

    public writeValue(value:number):void {
        this.currentValue = value;
        
        if (this.isNumber(value)) {
            let stringValue = value.toFixed(Number(this.getFractionDigits())).replace(".", ",");
            super.writeValue(stringValue);
            return;
        }

        super.writeValue(value);
    }

    private isNumber(value:any):boolean {
        return value && !isNaN(value.toString().replace(",", "."));
    }

    private changeValue(value:any) {
        this.onChange(value);
        this.currentValue = value;
    }

    private getFractionDigits() {
        return this.fractionDigits ? this.fractionDigits : 2;
    }

}