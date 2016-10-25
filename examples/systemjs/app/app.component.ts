import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";


@Component({
    selector: 'app',
    templateUrl: 'app/app.component.html'
})
export class AppComponent implements OnInit {

    public data;
    public filterQuery = "";

    constructor(private http: Http) {
    }

    ngOnInit(): void {
        this.http.get("/app/data.json")
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.data = data.json();
                }, 2000);
            });
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.name.length;
    }

}