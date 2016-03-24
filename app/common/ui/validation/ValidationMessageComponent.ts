import {Component, Input} from "angular2/core";
import {NgForm} from "angular2/common";
import {ToMapPipe} from "../../util/ToMapPipe";

@Component({
    selector: 'validation-message',
    pipes: [ToMapPipe],
    template: `<div *ngIf="ngForm.errors && hasInputFocus" class="alert alert-danger col-xs-12 {{position}}">
    <div *ngFor="#mapEntry of ngForm.errors | toMap">
    <span [ngSwitch]="mapEntry.key">
        <template ngSwitchWhen="required">Pole jest wymagane</template>
        <template ngSwitchDefault="required">{{mapEntry.value}}</template>
    </span>
    </div></div>`
})

export class ValidationMessageComponent {
    private hasInputFocus = false;
    @Input() ngForm:NgForm;
    @Input() position:string;
}