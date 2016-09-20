import {Component} from '@angular/core';
import {Http} from "@angular/http";

@Component({
    selector: 'app',
    templateUrl: 'app/app.html'
})
export class App {

    private data;

    constructor(private http:Http) {
        http.get("/app/data.json")
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.data = data.json();
                }, 5000);
            });
    }

    private toInt(num:string) {
        return +num;
    }

    private sortByWordLength = (a:any) => {
        return a.name.length;
    }

}