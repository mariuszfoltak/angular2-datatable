export enum LogLevel{
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4
}

export class Logger {

    constructor(private loggerName:String) {
    }

    public static logLevel = LogLevel.DEBUG;


    public debug(msg:any, ...optionalParams: any[]) {
        if (Logger.logLevel <= LogLevel.DEBUG) {
            console.debug(this.getMsg(msg), optionalParams);
        }
    }

    public info(msg:any, ...optionalParams: any[]) {
        if (Logger.logLevel <= LogLevel.INFO) {
            console.info(this.getMsg(msg), optionalParams);
        }
    }

    public warn(msg:any, ...optionalParams: any[]) {
        if (Logger.logLevel <= LogLevel.WARN) {
            console.warn(this.getMsg(msg), optionalParams);
        }
    }

    public error(msg:any, ...optionalParams: any[]) {
        if (Logger.logLevel <= LogLevel.ERROR) {
            console.error(this.getMsg(msg), optionalParams);
        }
    }


    private getMsg(msg:any) {
        return '[' + this.loggerName + '] ' + msg;
    }


}

