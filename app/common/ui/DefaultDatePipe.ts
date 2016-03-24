import {Pipe} from "angular2/core";
import moment from 'moment';

@Pipe({name: "defaultDate"})
export class DefaultDatePipe {
    transform(value: any, args: any[]) {
        return moment(value).format("YYYY-MM-DD");
    }
}

@Pipe({name: "defaultDateTime"})
export class DefaultDateTimePipe {
    transform(value: Date): string {
        return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
}