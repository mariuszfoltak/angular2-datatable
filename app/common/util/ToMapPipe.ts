import {Pipe} from "angular2/core";
import {PipeTransform} from "angular2/core";

@Pipe({name: "toMap"})
export class ToMapPipe implements PipeTransform {
    transform(object:any, args:any[]):any {
        return _.map(object, (value, property) => { return {key: property, value: value}});
    }
}