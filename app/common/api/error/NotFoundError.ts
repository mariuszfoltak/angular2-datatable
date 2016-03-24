import {ApiError} from "./ApiError";

export class NotFoundError extends ApiError {
    public constructor() {
        super("Not Found Error");
    }
}