import {Injectable, Inject} from "angular2/core";
import {Http, Headers, Response, RequestOptionsArgs} from "angular2/http";
import {Observable} from "rxjs/Observable";

import {APP_CONFIG, Config} from "../config/AppConfig";
import {ApiError} from "./error/ApiError";
import {ValidationError} from "./error/ValidationError";
import {NotFoundError} from "./error/NotFoundError";
import {UnexpectedError} from "./error/UnexpectedError";

declare var JSON:{ parseWithDate(json:string):any; };

interface ApiResponse {
    status: string,
    body: any
}

@Injectable()
export class ApiService {
    constructor(private http:Http) {
    }

    public get<T>(url:string, options?:RequestOptionsArgs):Observable<T> {
        return this.http.get(url, options)
            .catch(this.handleError)
            .map(this.mapResponse);
    }

    public post<T>(url:string, body:string, options?:RequestOptionsArgs):Observable<T> {

        options = options || {};
        options.headers = options.headers || new Headers();

        if (!options.headers.has('Content-Type')) {
            options.headers.append('Content-Type', 'application/json');
        }

        return this.http.post(url, body, options)
            .catch(this.handleError)
            .map(this.mapResponse);
    }

    private mapResponse = <T>(response:Response):T => {
        return JSON.parseWithDate(response.text());
    };

    private handleError = (resp:Response):Observable<ApiError> => {
        let apiResponse = <ApiResponse>resp.json();
        if (resp.status === 400 && apiResponse.status === "validationError") {
            return Observable.throw(new ValidationError(apiResponse.body));
        } else if (resp.status === 404) {
            return Observable.throw(new NotFoundError());
        }
        return Observable.throw(new UnexpectedError(resp));
    };
}