import {Component} from "@angular/core";
import {Http} from "@angular/http";


@Component({
    selector: 'app',
    templateUrl: 'src/AppComponent.html'
})
export class AppComponent {

    public data;

    constructor(private http:Http) {
        http.get("/src/data.json")
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.data = data.json();
                }, 2000);
            });
    }

    public toInt(num:string) {
        return +num;
    }

    public sortByWordLength = (a:any) => {
        return a.name.length;
    }

}