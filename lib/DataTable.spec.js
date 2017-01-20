"use strict";
var core_1 = require("@angular/core");
var DataTable_1 = require("./DataTable");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var _ = require("lodash");
var TestComponent = (function () {
    function TestComponent() {
    }
    TestComponent.decorators = [
        { type: core_1.Component, args: [{
                    template: "<table [mfData]=\"[]\"></table>"
                },] },
    ];
    TestComponent.ctorParameters = function () { return []; };
    return TestComponent;
}());
describe("DataTable directive tests", function () {
    var datatable;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [DataTable_1.DataTable, TestComponent]
        });
        fixture = testing_1.TestBed.createComponent(TestComponent);
        datatable = fixture.debugElement.query(platform_browser_1.By.directive(DataTable_1.DataTable)).injector.get(DataTable_1.DataTable);
        datatable.inputData = [
            { id: 3, name: 'banana' },
            { id: 1, name: 'Duck' },
            { id: 2, name: 'ącki' },
            { id: 5, name: 'Ðrone' },
            { id: 4, name: 'Ananas' }
        ];
        datatable.ngOnChanges({ inputData: new core_1.SimpleChange(null, datatable.inputData) });
    });
    describe("initializing", function () {
        it("data should be empty array if inputData is undefined or null", function () {
            datatable.ngOnChanges({ inputData: new core_1.SimpleChange(null, null) });
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([]);
        });
        it("data should be equal to inputData", function () {
            datatable.ngDoCheck();
            expect(datatable.data).toEqual(datatable.inputData);
        });
        it("data should be 2 first items", function () {
            datatable.rowsOnPage = 2;
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{ id: 3, name: 'banana' }, { id: 1, name: 'Duck' }]);
        });
        it("data should be 3. and 4. items", function () {
            datatable.rowsOnPage = 2;
            datatable.activePage = 2;
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{ id: 2, name: 'ącki' }, { id: 5, name: 'Ðrone' }]);
        });
        it("shouldn't recalculate data when no changes", function () {
            datatable.ngDoCheck();
            var data = datatable.data;
            datatable.ngOnChanges({});
            datatable.ngDoCheck();
            expect(datatable.data).toBe(data);
        });
    });
    describe("pagination", function () {
        beforeEach(function () {
            datatable.rowsOnPage = 2;
            datatable.ngDoCheck();
        });
        it("should return current page settings", function () {
            expect(datatable.getPage()).toEqual({ activePage: 1, rowsOnPage: 2, dataLength: 5 });
        });
        it("data should be 3. and 4. items when page change", function () {
            datatable.setPage(2, 2);
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{ id: 2, name: 'ącki' }, { id: 5, name: 'Ðrone' }]);
        });
        it("data should be three first items when page change", function () {
            datatable.setPage(1, 3);
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{ id: 3, name: 'banana' }, { id: 1, name: 'Duck' }, { id: 2, name: 'ącki' }]);
        });
        it("data should be two last items when page change", function () {
            datatable.setPage(2, 3);
            datatable.setPage(2, 3);
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{ id: 5, name: 'Ðrone' }, { id: 4, name: 'Ananas' }]);
        });
        it("should change rowsOnPage when mfRowsOnPage changed", function (done) {
            datatable.rowsOnPage = 2;
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{ id: 3, name: 'banana' }, { id: 1, name: 'Duck' }]);
            datatable.onPageChange.subscribe(function (pageOptions) {
                expect(pageOptions.rowsOnPage).toEqual(3);
                done();
            });
            datatable.rowsOnPage = 3;
            datatable.ngOnChanges({ rowsOnPage: new core_1.SimpleChange(2, 3) });
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{ id: 3, name: 'banana' }, { id: 1, name: 'Duck' }, { id: 2, name: 'ącki' }]);
        });
    });
    describe("sorting", function () {
        it("id should return current sort setting", function () {
            datatable.setSort("id", "desc");
            expect(datatable.getSort()).toEqual({ sortBy: "id", sortOrder: "desc" });
        });
        it("should sort data after sorting input value changed", function () {
            datatable.ngDoCheck();
            datatable.sortBy = "id";
            datatable.sortOrder = "asc";
            datatable.ngOnChanges({
                sortBy: new core_1.SimpleChange(null, datatable.sortBy),
                sortOrder: new core_1.SimpleChange(null, datatable.sortOrder)
            });
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([
                { id: 1, name: 'Duck' },
                { id: 2, name: 'ącki' },
                { id: 3, name: 'banana' },
                { id: 4, name: 'Ananas' },
                { id: 5, name: 'Ðrone' }
            ]);
        });
        it("should fire onSortChange event after sorting input value changed", function (done) {
            datatable.onSortChange.subscribe(function (event) {
                expect(event.sortBy).toEqual("id");
                expect(event.sortOrder).toEqual("desc");
                done();
            });
            datatable.ngDoCheck();
            datatable.sortBy = "id";
            datatable.sortOrder = "desc";
            datatable.ngOnChanges({
                sortBy: new core_1.SimpleChange(null, datatable.sortBy),
                sortOrder: new core_1.SimpleChange(null, datatable.sortOrder)
            });
            datatable.ngDoCheck();
        });
        it("should set sortOrder to 'asc' if not provided", function (done) {
            datatable.onSortChange.subscribe(function (event) {
                expect(event.sortBy).toEqual("id");
                expect(event.sortOrder).toEqual("asc");
                done();
            });
            datatable.ngDoCheck();
            datatable.sortBy = "id";
            datatable.ngOnChanges({
                sortBy: new core_1.SimpleChange(null, datatable.sortBy)
            });
            datatable.ngDoCheck();
            expect(datatable.sortOrder).toEqual("asc");
        });
        it("should set sortOrder to 'asc' if provided something else than 'asc' or 'desc'", function (done) {
            datatable.onSortChange.subscribe(function (event) {
                expect(event.sortBy).toEqual("id");
                expect(event.sortOrder).toEqual("asc");
                done();
            });
            datatable.ngDoCheck();
            datatable.sortBy = "id";
            datatable.sortOrder = "bulb";
            datatable.ngOnChanges({
                sortBy: new core_1.SimpleChange(null, datatable.sortBy),
                sortOrder: new core_1.SimpleChange(null, datatable.sortOrder)
            });
            datatable.ngDoCheck();
            expect(datatable.sortOrder).toEqual("asc");
            expect(datatable.data).toEqual([
                { id: 1, name: 'Duck' },
                { id: 2, name: 'ącki' },
                { id: 3, name: 'banana' },
                { id: 4, name: 'Ananas' },
                { id: 5, name: 'Ðrone' }
            ]);
        });
        it("shouldn't change order when only order provided", function (done) {
            done();
            datatable.onSortChange.subscribe(function () {
                done.fail("OnSortChange shouldn't been fired");
            });
            datatable.ngDoCheck();
            datatable.sortOrder = "desc";
            datatable.ngOnChanges({ sortOrder: new core_1.SimpleChange(null, datatable.sortOrder) });
            datatable.ngDoCheck();
            expect(datatable.data).toEqual(datatable.inputData);
        });
        it("should call output event when sorting changed", function (done) {
            datatable.ngDoCheck();
            datatable.sortByChange.switchMap(function (sortBy) {
                expect(sortBy).toEqual("id");
                return datatable.sortOrderChange;
            }).subscribe(function (sortOrder) {
                expect(sortOrder).toEqual("desc");
                done();
            });
            datatable.setSort("id", "desc");
        });
        it("shouldn't call output event when sortOrder fixed", function (done) {
            datatable.ngDoCheck();
            datatable.sortOrderChange.subscribe(function () {
                done.fail("Shouldn't call sortOrderChange");
            });
            done();
            datatable.sortOrder = "bulb";
            datatable.ngOnChanges({ sortOrder: new core_1.SimpleChange(null, datatable.sortOrder) });
            datatable.ngDoCheck();
        });
        it("shouldn't refresh data when set page with same settings", function () {
            datatable.setSort("name", "asc");
            datatable.ngDoCheck();
            var data = datatable.data;
            datatable.setSort("name", "asc");
            datatable.ngDoCheck();
            expect(datatable.data).toBe(data);
        });
        it("should sort data ascending by name", function () {
            datatable.setSort("name", "asc");
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([
                { id: 4, name: 'Ananas' },
                { id: 3, name: 'banana' },
                { id: 1, name: 'Duck' },
                { id: 5, name: 'Ðrone' },
                { id: 2, name: 'ącki' }
            ]);
        });
        it("should sort data descending by id", function () {
            datatable.setSort("id", "desc");
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([
                { id: 5, name: 'Ðrone' },
                { id: 4, name: 'Ananas' },
                { id: 3, name: 'banana' },
                { id: 2, name: 'ącki' },
                { id: 1, name: 'Duck' }
            ]);
        });
        it("should sort data by two values", function () {
            var newData = [
                { name: 'Claire', age: 9 },
                { name: 'Anna', age: 34 },
                { name: 'Claire', age: 16 },
                { name: 'Claire', age: 7 },
                { name: 'Anna', age: 12 }
            ];
            datatable.ngOnChanges({ inputData: new core_1.SimpleChange(datatable.inputData, newData) });
            datatable.setSort(['name', 'age'], "asc");
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([
                { name: 'Anna', age: 12 },
                { name: 'Anna', age: 34 },
                { name: 'Claire', age: 7 },
                { name: 'Claire', age: 9 },
                { name: 'Claire', age: 16 }
            ]);
        });
        it("should sort data by child property value", function () {
            var newData = [
                { name: 'Claire', city: { zip: '51111' } },
                { name: 'Anna', city: { zip: '31111' } },
                { name: 'Claire', city: { zip: '41111' } },
                { name: 'Claire', city: { zip: '11111' } },
                { name: 'Anna', city: { zip: '21111' } }
            ];
            datatable.ngOnChanges({ inputData: new core_1.SimpleChange(datatable.inputData, newData) });
            datatable.setSort("city.zip", "asc");
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([
                { name: 'Claire', city: { zip: '11111' } },
                { name: 'Anna', city: { zip: '21111' } },
                { name: 'Anna', city: { zip: '31111' } },
                { name: 'Claire', city: { zip: '41111' } },
                { name: 'Claire', city: { zip: '51111' } },
            ]);
        });
    });
    describe("data change", function () {
        it("should refresh data when inputData change", function () {
            var newData = [{ id: 5, name: 'Ðrone' }, { id: 4, name: 'Ananas' }];
            datatable.ngOnChanges({ inputData: new core_1.SimpleChange(datatable.inputData, newData) });
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{ id: 5, name: 'Ðrone' }, { id: 4, name: 'Ananas' }]);
        });
        it("should refresh data when rows removed from inputData", function () {
            datatable.ngDoCheck();
            expect(datatable.data).toEqual(datatable.inputData);
            datatable.inputData.pop();
            datatable.ngDoCheck();
            expect(datatable.data).toEqual(datatable.inputData);
        });
        it("should refresh data when rows added to inputData", function () {
            datatable.ngDoCheck();
            expect(datatable.data).toEqual(datatable.inputData);
            datatable.inputData.push({ id: 6, name: 'Furby' });
            datatable.ngDoCheck();
            expect(datatable.data).toEqual(datatable.inputData);
        });
        it("should fire onPageChange event after inputData change", function (done) {
            datatable.setPage(2, 2);
            datatable.ngDoCheck();
            datatable.onPageChange.subscribe(function (opt) {
                expect(opt.activePage).toEqual(1);
                expect(opt.dataLength).toEqual(2);
                expect(opt.rowsOnPage).toEqual(2);
                done();
            });
            var newData = [{ id: 5, name: 'Ðrone' }, { id: 4, name: 'Ananas' }];
            datatable.ngOnChanges({ inputData: new core_1.SimpleChange(datatable.inputData, newData) });
            datatable.ngDoCheck();
        });
        it("should fire onPageChange event after rows added", function (done) {
            datatable.setPage(2, 2);
            datatable.ngDoCheck();
            datatable.onPageChange.subscribe(function (opt) {
                expect(opt.activePage).toEqual(2);
                expect(opt.dataLength).toEqual(6);
                expect(opt.rowsOnPage).toEqual(2);
                done();
            });
            datatable.inputData.push({ id: 6, name: 'Furby' });
            datatable.ngDoCheck();
        });
        it("should fire onPageChange event after rows removed", function (done) {
            datatable.setPage(2, 2);
            datatable.ngDoCheck();
            datatable.onPageChange.subscribe(function (opt) {
                expect(opt.activePage).toEqual(1);
                expect(opt.dataLength).toEqual(2);
                expect(opt.rowsOnPage).toEqual(2);
                done();
            });
            _.times(3, function () { return datatable.inputData.pop(); });
            datatable.ngDoCheck();
        });
        it("should change page when no data on current page after changed inputData", function () {
            datatable.setPage(2, 2);
            datatable.ngDoCheck();
            var newData = [{ id: 5, name: 'Ðrone' }, { id: 4, name: 'Ananas' }];
            datatable.ngOnChanges({ inputData: new core_1.SimpleChange(datatable.inputData, newData) });
            datatable.ngDoCheck();
            expect(datatable.data).toEqual(newData);
        });
        it("should change page when no data on current page after rows removed", function () {
            datatable.setPage(2, 2);
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{ id: 2, name: 'ącki' }, { id: 5, name: 'Ðrone' }]);
            datatable.inputData.pop();
            datatable.inputData.pop();
            datatable.inputData.pop();
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{ id: 3, name: 'banana' }, { id: 1, name: 'Duck' }]);
        });
        it("shouldn't change page when can display data after data changed", function () {
            datatable.setPage(2, 1);
            datatable.ngDoCheck();
            var newData = [{ id: 5, name: 'Ðrone' }, { id: 1, name: 'Duck' }, { id: 4, name: 'Ananas' }];
            datatable.ngOnChanges({ inputData: new core_1.SimpleChange(datatable.inputData, newData) });
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{ id: 1, name: 'Duck' }]);
        });
        it("shouldn't change page when can display data after rows removed", function () {
            datatable.setPage(2, 1);
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{ id: 1, name: 'Duck' }]);
            datatable.inputData.pop();
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{ id: 1, name: 'Duck' }]);
        });
        it("shouldn't change page when can display data after rows added", function () {
            datatable.setPage(2, 1);
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{ id: 1, name: 'Duck' }]);
            datatable.inputData.push({ id: 6, name: 'Furby' });
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{ id: 1, name: 'Duck' }]);
        });
        it("shouldn't change page to 0 when data is empty", function () {
            datatable.setPage(2, 1);
            datatable.ngDoCheck();
            var newData = [];
            datatable.ngOnChanges({ inputData: new core_1.SimpleChange(datatable.inputData, newData) });
            datatable.ngDoCheck();
            expect(datatable.activePage).toEqual(1);
        });
        it("shouldn't change page to 0 when data is empty after removed rows", function () {
            datatable.setPage(2, 1);
            datatable.ngDoCheck();
            _.times(5, function () { return datatable.inputData.pop(); });
            datatable.ngDoCheck();
            expect(datatable.inputData.length).toEqual(0);
            expect(datatable.activePage).toEqual(1);
        });
    });
});
//# sourceMappingURL=DataTable.spec.js.map