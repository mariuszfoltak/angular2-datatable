import {BusinessError} from "BusinessError";
import {ApiError} from "./ApiError";

export class ValidationError extends ApiError {
    public constructor(public businessErrors: BusinessError[]) {
        super("Validation error");
    }
}