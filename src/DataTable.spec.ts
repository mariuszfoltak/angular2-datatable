///<reference path="../node_modules/@types/jasmine/index.d.ts"/>
import {SimpleChange, Component} from "@angular/core";
import {DataTable, PageEvent, SortEvent} from "./DataTable";
import {TestBed, ComponentFixture} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import * as _ from "lodash";

@Component({
    template: `<table [mfData]="[]"></table>`
})
class TestComponent {
}

describe("DataTable directive tests", ()=> {
    let datatable: DataTable;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(()=> {
        TestBed.configureTestingModule({
            declarations: [DataTable, TestComponent]
        });
        fixture = TestBed.createComponent(TestComponent);
        datatable = fixture.debugElement.query(By.directive(DataTable)).injector.get(DataTable) as DataTable;

        datatable.inputData = [
            {id: 3, name: 'banana'},
            {id: 1, name: 'Duck'},
            {id: 2, name: 'ącki'},
            {id: 5, name: 'Ðrone'},
            {id: 4, name: 'Ananas'}
        ];
        datatable.ngOnChanges({inputData: new SimpleChange(null, datatable.inputData)});
    });

    describe("initializing", ()=> {

        it("data should be empty array if inputData is undefined or null", () => {
            datatable.ngOnChanges({inputData: new SimpleChange(null, null)});
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([]);
        });

        it("data should be equal to inputData", ()=> {
            datatable.ngDoCheck();
            expect(datatable.data).toEqual(datatable.inputData);
        });

        it("data should be 2 first items", ()=> {
            datatable.rowsOnPage = 2;
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{id: 3, name: 'banana'}, {id: 1, name: 'Duck'}]);
        });

        it("data should be 3. and 4. items", ()=> {
            datatable.rowsOnPage = 2;
            datatable.activePage = 2;
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{id: 2, name: 'ącki'}, {id: 5, name: 'Ðrone'}]);
        });

        it("shouldn't recalculate data when no changes", ()=> {
            datatable.ngDoCheck();
            let data = datatable.data;
            datatable.ngOnChanges({});
            datatable.ngDoCheck();
            expect(datatable.data).toBe(data);
        });
    });

    describe("pagination", ()=> {

        beforeEach(()=> {
            datatable.rowsOnPage = 2;
            datatable.ngDoCheck();
        });

        it("should return current page settings", ()=> {
            expect(datatable.getPage()).toEqual({activePage: 1, rowsOnPage: 2, dataLength: 5});
        });

        it("data should be 3. and 4. items when page change", ()=> {
            datatable.setPage(2, 2);
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{id: 2, name: 'ącki'}, {id: 5, name: 'Ðrone'}]);
        });

        it("data should be three first items when page change", ()=> {
            datatable.setPage(1, 3);
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{id: 3, name: 'banana'}, {id: 1, name: 'Duck'}, {id: 2, name: 'ącki'}]);
        });

        it("data should be two last items when page change", ()=> {
            datatable.setPage(2, 3);
            datatable.setPage(2, 3);
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{id: 5, name: 'Ðrone'}, {id: 4, name: 'Ananas'}]);
        });

        it("should change rowsOnPage when mfRowsOnPage changed", (done)=> {
            datatable.rowsOnPage = 2;
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{id: 3, name: 'banana'}, {id: 1, name: 'Duck'}]);

            datatable.onPageChange.subscribe((pageOptions: PageEvent)=> {
                expect(pageOptions.rowsOnPage).toEqual(3);
                done();
            });

            datatable.rowsOnPage = 3;
            datatable.ngOnChanges({rowsOnPage: new SimpleChange(2, 3)});
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{id: 3, name: 'banana'}, {id: 1, name: 'Duck'}, {id: 2, name: 'ącki'}]);


        });
    });

    describe("sorting", ()=> {

        it("id should return current sort setting", () => {
            datatable.setSort("id", "desc");
            expect(datatable.getSort()).toEqual({sortBy: "id", sortOrder: "desc"});
        });

        it("should sort data after sorting input value changed", () => {
            datatable.ngDoCheck();
            datatable.sortBy = "id";
            datatable.sortOrder = "asc";
            datatable.ngOnChanges({
                sortBy: new SimpleChange(null, datatable.sortBy),
                sortOrder: new SimpleChange(null, datatable.sortOrder)
            });
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([
                {id: 1, name: 'Duck'},
                {id: 2, name: 'ącki'},
                {id: 3, name: 'banana'},
                {id: 4, name: 'Ananas'},
                {id: 5, name: 'Ðrone'}
            ])
        });

        it("should fire onSortChange event after sorting input value changed", (done)=> {
            datatable.onSortChange.subscribe((event: SortEvent)=> {
                expect(event.sortBy).toEqual("id");
                expect(event.sortOrder).toEqual("desc");
                done();
            });
            datatable.ngDoCheck();
            datatable.sortBy = "id";
            datatable.sortOrder = "desc";
            datatable.ngOnChanges({
                sortBy: new SimpleChange(null, datatable.sortBy),
                sortOrder: new SimpleChange(null, datatable.sortOrder)
            });
            datatable.ngDoCheck();

        });

        it("should set sortOrder to 'asc' if not provided", (done)=> {
            datatable.onSortChange.subscribe((event: SortEvent)=> {
                expect(event.sortBy).toEqual("id");
                expect(event.sortOrder).toEqual("asc");
                done();
            });
            datatable.ngDoCheck();
            datatable.sortBy = "id";
            datatable.ngOnChanges({
                sortBy: new SimpleChange(null, datatable.sortBy)
            });
            datatable.ngDoCheck();
            expect(datatable.sortOrder).toEqual("asc");
        });

        it("should set sortOrder to 'asc' if provided something else than 'asc' or 'desc'", (done)=> {
            datatable.onSortChange.subscribe((event: SortEvent)=> {
                expect(event.sortBy).toEqual("id");
                expect(event.sortOrder).toEqual("asc");
                done();
            });
            datatable.ngDoCheck();
            datatable.sortBy = "id";
            datatable.sortOrder = "bulb";
            datatable.ngOnChanges({
                sortBy: new SimpleChange(null, datatable.sortBy),
                sortOrder: new SimpleChange(null, datatable.sortOrder)
            });
            datatable.ngDoCheck();
            expect(datatable.sortOrder).toEqual("asc");
            expect(datatable.data).toEqual([
                {id: 1, name: 'Duck'},
                {id: 2, name: 'ącki'},
                {id: 3, name: 'banana'},
                {id: 4, name: 'Ananas'},
                {id: 5, name: 'Ðrone'}
            ]);
        });

        it("shouldn't change order when only order provided", (done)=> {
            done();
            datatable.onSortChange.subscribe(()=> {
                done.fail("OnSortChange shouldn't been fired");
            });
            datatable.ngDoCheck();
            datatable.sortOrder = "desc";
            datatable.ngOnChanges({sortOrder: new SimpleChange(null, datatable.sortOrder)});
            datatable.ngDoCheck();
            expect(datatable.data).toEqual(datatable.inputData);
        });

        it("should call output event when sorting changed", (done)=> {
            datatable.ngDoCheck();
            datatable.sortByChange.switchMap((sortBy: string)=> {
                expect(sortBy).toEqual("id");
                return datatable.sortOrderChange;
            }).subscribe((sortOrder: string)=> {
                expect(sortOrder).toEqual("desc");
                done();
            });

            datatable.setSort("id", "desc");
        });

        it("shouldn't call output event when sortOrder fixed", (done)=> {
            datatable.ngDoCheck();
            datatable.sortOrderChange.subscribe(()=> {
                done.fail("Shouldn't call sortOrderChange");
            });
            done();
            datatable.sortOrder = "bulb";
            datatable.ngOnChanges({sortOrder: new SimpleChange(null, datatable.sortOrder)});
            datatable.ngDoCheck();
        });
        // Wywołanie outputa gdy zmiana z innej strony

        it("shouldn't refresh data when set page with same settings", ()=> {
            datatable.setSort("name", "asc");
            datatable.ngDoCheck();
            let data = datatable.data;
            datatable.setSort("name", "asc");
            datatable.ngDoCheck();
            expect(datatable.data).toBe(data);
        });

        it("should sort data ascending by name", ()=> {
            datatable.setSort("name", "asc");
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([
                {id: 4, name: 'Ananas'},
                {id: 3, name: 'banana'},
                {id: 1, name: 'Duck'},
                {id: 5, name: 'Ðrone'},
                {id: 2, name: 'ącki'}
            ])
        });

        it("should sort data descending by id", ()=> {
            datatable.setSort("id", "desc");
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([
                {id: 5, name: 'Ðrone'},
                {id: 4, name: 'Ananas'},
                {id: 3, name: 'banana'},
                {id: 2, name: 'ącki'},
                {id: 1, name: 'Duck'}
            ])
        });

        it("should sort data by two values", ()=> {
            let newData = [
                {name: 'Claire', age: 9},
                {name: 'Anna', age: 34},
                {name: 'Claire', age: 16},
                {name: 'Claire', age: 7},
                {name: 'Anna', age: 12}
            ];
            datatable.ngOnChanges({inputData: new SimpleChange(datatable.inputData, newData)});
            datatable.setSort(['name', 'age'], "asc");
            datatable.ngDoCheck();

            expect(datatable.data).toEqual([
                {name: 'Anna', age: 12},
                {name: 'Anna', age: 34},
                {name: 'Claire', age: 7},
                {name: 'Claire', age: 9},
                {name: 'Claire', age: 16}
            ]);
        });

        it("should sort data by child property value", ()=> {
            let newData = [
                {name: 'Claire', city: {zip: '51111'}},
                {name: 'Anna', city: {zip: '31111'}},
                {name: 'Claire', city: {zip: '41111'}},
                {name: 'Claire', city: {zip: '11111'}},
                {name: 'Anna', city: {zip: '21111'}}
            ];
            datatable.ngOnChanges({inputData: new SimpleChange(datatable.inputData, newData)});
            datatable.setSort("city.zip", "asc");
            datatable.ngDoCheck();

            expect(datatable.data).toEqual([
                {name: 'Claire', city: {zip: '11111'}},
                {name: 'Anna', city: {zip: '21111'}},
                {name: 'Anna', city: {zip: '31111'}},
                {name: 'Claire', city: {zip: '41111'}},
                {name: 'Claire', city: {zip: '51111'}},
            ]);
        });
    });

    describe("data change", ()=> {
        it("should refresh data when inputData change", ()=> {
            let newData = [{id: 5, name: 'Ðrone'}, {id: 4, name: 'Ananas'}];
            datatable.ngOnChanges({inputData: new SimpleChange(datatable.inputData, newData)});
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{id: 5, name: 'Ðrone'}, {id: 4, name: 'Ananas'}]);
        });

        it("should refresh data when rows removed from inputData", ()=> {
            datatable.ngDoCheck();
            expect(datatable.data).toEqual(datatable.inputData);
            datatable.inputData.pop();
            datatable.ngDoCheck();
            expect(datatable.data).toEqual(datatable.inputData);
        });

        it("should refresh data when rows added to inputData", ()=> {
            datatable.ngDoCheck();
            expect(datatable.data).toEqual(datatable.inputData);
            datatable.inputData.push({id: 6, name: 'Furby'});
            datatable.ngDoCheck();
            expect(datatable.data).toEqual(datatable.inputData);
        });

        it("should fire onPageChange event after inputData change", (done)=> {
            datatable.setPage(2, 2);
            datatable.ngDoCheck();

            datatable.onPageChange.subscribe((opt: PageEvent)=> {
                expect(opt.activePage).toEqual(1);
                expect(opt.dataLength).toEqual(2);
                expect(opt.rowsOnPage).toEqual(2);
                done();
            });
            let newData = [{id: 5, name: 'Ðrone'}, {id: 4, name: 'Ananas'}];
            datatable.ngOnChanges({inputData: new SimpleChange(datatable.inputData, newData)});
            datatable.ngDoCheck();
        });

        it("should fire onPageChange event after rows added", (done)=> {
            datatable.setPage(2, 2);
            datatable.ngDoCheck();

            datatable.onPageChange.subscribe((opt: PageEvent)=> {
                expect(opt.activePage).toEqual(2);
                expect(opt.dataLength).toEqual(6);
                expect(opt.rowsOnPage).toEqual(2);
                done();
            });
            datatable.inputData.push({id: 6, name: 'Furby'});
            datatable.ngDoCheck();
        });

        it("should fire onPageChange event after rows removed", (done)=> {
            datatable.setPage(2, 2);
            datatable.ngDoCheck();

            datatable.onPageChange.subscribe((opt: PageEvent)=> {
                expect(opt.activePage).toEqual(1);
                expect(opt.dataLength).toEqual(2);
                expect(opt.rowsOnPage).toEqual(2);
                done();
            });
            _.times(3, ()=>datatable.inputData.pop());
            datatable.ngDoCheck();
        });

        it("should change page when no data on current page after changed inputData", ()=> {
            datatable.setPage(2, 2);
            datatable.ngDoCheck();

            let newData = [{id: 5, name: 'Ðrone'}, {id: 4, name: 'Ananas'}];
            datatable.ngOnChanges({inputData: new SimpleChange(datatable.inputData, newData)});
            datatable.ngDoCheck();
            expect(datatable.data).toEqual(newData);
        });

        it("should change page when no data on current page after rows removed", ()=> {
            datatable.setPage(2, 2);
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{id: 2, name: 'ącki'}, {id: 5, name: 'Ðrone'}]);

            datatable.inputData.pop();
            datatable.inputData.pop();
            datatable.inputData.pop();
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{id: 3, name: 'banana'}, {id: 1, name: 'Duck'}]);
        });

        it("shouldn't change page when can display data after data changed", ()=> {
            datatable.setPage(2, 1);
            datatable.ngDoCheck();

            let newData = [{id: 5, name: 'Ðrone'}, {id: 1, name: 'Duck'}, {id: 4, name: 'Ananas'}];
            datatable.ngOnChanges({inputData: new SimpleChange(datatable.inputData, newData)});
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{id: 1, name: 'Duck'}]);
        });

        it("shouldn't change page when can display data after rows removed", ()=> {
            datatable.setPage(2, 1);
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{id: 1, name: 'Duck'}]);

            datatable.inputData.pop();
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{id: 1, name: 'Duck'}]);
        });

        it("shouldn't change page when can display data after rows added", ()=> {
            datatable.setPage(2, 1);
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{id: 1, name: 'Duck'}]);

            datatable.inputData.push({id: 6, name: 'Furby'});
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{id: 1, name: 'Duck'}]);
        });

        it("shouldn't change page to 0 when data is empty", ()=> {
            datatable.setPage(2, 1);
            datatable.ngDoCheck();

            let newData = [];
            datatable.ngOnChanges({inputData: new SimpleChange(datatable.inputData, newData)});
            datatable.ngDoCheck();
            expect(datatable.activePage).toEqual(1);
        });

        it("shouldn't change page to 0 when data is empty after removed rows", ()=> {
            datatable.setPage(2, 1);
            datatable.ngDoCheck();

            _.times(5, ()=>datatable.inputData.pop());
            datatable.ngDoCheck();
            expect(datatable.inputData.length).toEqual(0);
            expect(datatable.activePage).toEqual(1);
        });
    });
});