# DataTable component for Angular2

## Installation

```
npm -i angular2-table
```

## Usage example

app.ts
```typescript
 import {Component} from 'angular2/core';
 import {DataTableDirectives} from 'angular2-datatable/datatable';
 
 @Component({
     selector: 'app',
     templateUrl: 'app.html',
     directives: [DataTableDirectives]
 })
 export class App {
     private data: any[] = ...
 }
```

app.html
```html
<table class="table table-striped" [mfData]="data" #mf="mfDataTable">
    <thead>
    <tr>
        <th style="width: 20%">
            <mfDefaultSorter by="name">Name</mfDefaultSorter>
        </th>
        <th style="width: 50%">
            <mfDefaultSorter by="email">Email</mfDefaultSorter>
        </th>
        <th style="width: 10%">
            <mfDefaultSorter by="age">Age</mfDefaultSorter>
        </th>
        <th style="width: 20%">
            <mfDefaultSorter by="city">City</mfDefaultSorter>
        </th>
    </tr>
    </thead>
    <tbody>
    <tr *ngFor="#item of mf.data">
        <td>{{item.name}}</td>
        <td>{{item.email}}</td>
        <td class="text-right">{{item.age}}</td>
        <td>{{item.city | uppercase}}</td>
    </tr>
    </tbody>
    <tfoot>
    <tr>
        <td colspan="4">
            <mfBootstrapPaginator [rowsOnPageSet]="[5,10,25]" [rowsOnPage]="5"></mfBootstrapPaginator>
        </td>
    </tr>
    </tfoot>
</table>
```
