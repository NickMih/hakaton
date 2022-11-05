import { Observable, of } from 'rxjs';
import { MatSort } from '@angular/material/sort';


export class TableSource<T> {
  data: T[];
  sortData: ((data: any, sort: MatSort) => any);

  constructor(tableData: any) {
    this.data = tableData;
  }

  connect(): Observable<any> {
    const rows = [];
    this.data.forEach(element => rows.push(element, {detailRow: true, element}));

    return of(rows);
  }

  disconnect() {

  }
}
