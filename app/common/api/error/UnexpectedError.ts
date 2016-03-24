import {Response} from "angular2/http";
import {ApiError} from "./ApiError";

export class UnexpectedError extends ApiError {

    public constructor(public response: Response) {
        super("Unexpected Error");
    }
}