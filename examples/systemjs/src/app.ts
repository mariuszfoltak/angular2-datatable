import {
    Component,
    Input,
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS, Http} from "angular2/http";

@Component({
    selector: "upper",
    template: `<div *ngIf="upper">{{upper.toUpperCase()}}</div>`
})
export class UpperComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
    ngOnChanges(changes:{}):any {
        console.info("UpperComponent(3) ngOnChanges");
    }

    ngOnInit():any {
        console.info("UpperComponent(3) ngOnInit");
    }

    ngDoCheck():any {
        console.info("UpperComponent(3) ngDoCheck");
    }

    ngAfterContentInit():any {
        console.info("UpperComponent(3) ngAfterContentInit");
    }

    ngAfterContentChecked():any {
        console.info("UpperComponent(3) ngAfterContentChecked");
    }

    ngAfterViewInit():any {
        console.info("UpperComponent(3) ngAfterViewInit");
    }

    ngAfterViewChecked():any {
        console.info("UpperComponent(3) ngAfterViewChecked");
    }

    ngOnDestroy():any {
        console.info("UpperComponent(3) ngOnDestroy");
    }
    @Input() upper: string;
}

@Component({
    selector: "reverse",
    template: `<div *ngIf="reverse">{{reverse.split('').reverse().join('')}}</div><upper [upper]="reverse"></upper>`,
    directives: [[UpperComponent]]
})
export class BackwardComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
    ngOnChanges(changes:{}):any {
        console.info("BackwardComponent(2) ngOnChanges");
    }

    ngOnInit():any {
        console.info("BackwardComponent(2) ngOnInit");
    }

    ngDoCheck():any {
        console.info("BackwardComponent(2) ngDoCheck");
    }

    ngAfterContentInit():any {
        console.info("BackwardComponent(2) ngAfterContentInit");
    }

    ngAfterContentChecked():any {
        console.info("BackwardComponent(2) ngAfterContentChecked");
    }

    ngAfterViewInit():any {
        console.info("BackwardComponent(2) ngAfterViewInit");
    }

    ngAfterViewChecked():any {
        console.info("BackwardComponent(2) ngAfterViewChecked");
    }

    ngOnDestroy():any {
        console.info("BackwardComponent(2) ngOnDestroy");
    }
    @Input() reverse: string;
}

@Component({
    selector: "word",
    template: `<div>{{word}}</div><ng-content></ng-content>`,
    directives: [[BackwardComponent]]
})
export class WordComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
    ngOnChanges(changes:{}):any {
        console.info("WordComponent(1) ngOnChanges");
    }

    ngOnInit():any {
        console.info("WordComponent(1) ngOnInit");
    }

    ngDoCheck():any {
        console.info("WordComponent(1) ngDoCheck");
    }

    ngAfterContentInit():any {
        console.info("WordComponent(1) ngAfterContentInit");
    }

    ngAfterContentChecked():any {
        console.info("WordComponent(1) ngAfterContentChecked");
    }

    ngAfterViewInit():any {
        console.info("WordComponent(1) ngAfterViewInit");
    }

    ngAfterViewChecked():any {
        console.info("WordComponent(1) ngAfterViewChecked");
    }

    ngOnDestroy():any {
        console.info("WordComponent(1) ngOnDestroy");
    }
    @Input() word: string;
}

@Component({
    selector: 'app',
    template: `<div><input [(ngModel)]="abc"/></div>
    <div><input [(ngModel)]="def" /></div>
    <word #word [word]="abc"><reverse [reverse]="def"></reverse></word>`,
    providers: [HTTP_PROVIDERS],
    directives: [[WordComponent, BackwardComponent]]
})
export class App {

    private data = [];

    private abc: string;
    private def: string;

    constructor(private http: Http) {
        http.get("/src/data.json")
            .subscribe((data)=>{
                this.data = data.json();
            });
    }

}

bootstrap(App);