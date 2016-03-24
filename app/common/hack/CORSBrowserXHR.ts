import {BrowserXhr, HTTP_PROVIDERS} from "angular2/http";
import {Injectable, provide} from "angular2/core";

/**
 * To jest hack, brzydki hack. Żeby wysłać ciasteczka z loginem,
 * należy w obiekcie XMLHttpRequest ustawić atrybut withCredentials na true.
 * Angular2 przesłania nam ten obiekt, ale nie umożliwia ustawienia tej flagi,
 * więc musimy podmienić klase, która jest używana przez Angulara.
 * TODO: Jak tylko to naprawią, to trzeba usunąć tą klasę i zrobić to zgodnie ze sztuką.
 *
 * Issue: https://github.com/angular/http/issues/65
 */
@Injectable()
export class CORSBrowserXHR extends BrowserXhr {
    build(): any{
        var xhr:any = super.build();
        xhr.withCredentials = true;
        return xhr;
    }
}