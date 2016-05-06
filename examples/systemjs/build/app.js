"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var common_1 = require("angular2/common");
var http_1 = require("angular2/http");
var datatable_1 = require('angular2-datatable/datatable');
var App = (function () {
    function App(http) {
        var _this = this;
        this.http = http;
        this.data = [];
        this.sortByWordLength = function (a) {
            return a.name.length;
        };
        http.get("/src/data.json")
            .subscribe(function (data) {
            _this.data = data.json();
        });
    }
    App.prototype.toInt = function (num) {
        return +num;
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: 'src/app.html',
            providers: [http_1.HTTP_PROVIDERS],
            directives: [datatable_1.DataTableDirectives],
            pipes: [common_1.DatePipe]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], App);
    return App;
}());
exports.App = App;
browser_1.bootstrap(App);
//# sourceMappingURL=app.js.map