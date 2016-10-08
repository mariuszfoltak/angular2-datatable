import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./AppModule";

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);