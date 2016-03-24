export class Optional<T> {

    static Absent = Optional.of(null);

    static of<E>(arg:E):Optional<E> {
        return new Optional(arg);
    }

    constructor(private _arg:T) {
    }

    isPresent():boolean {
        if (this._arg) {
            return true;
        } else {
            return false;
        }
    }

    get():T {
        return this._arg;
    }

    or( defaultVal : T ):T {
        if( this.isPresent() ){
            return this.get();
        }else{
            return defaultVal;
        }
    }

}