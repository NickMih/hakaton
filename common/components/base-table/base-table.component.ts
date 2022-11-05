import { MatPaginator } from '@angular/material/paginator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';

import { TableSource } from './table-source';
import {DefaultParams} from "../../default-models";

@UntilDestroy()
@Component({
  selector: '',
  template: ''
})
export class BaseTableComponent {
  isSortStarted: boolean = false;
  isFirstLoad: boolean = true;

  params: DefaultParams;
  paramsChange: EventEmitter<any>;

  orderingChangedEvent: EventEmitter<any>;

  sort: MatSort;
  paginator: MatPaginator;

  selection: SelectionModel<any>;
  dataSource: any;
  expandedRowsArray: number[] = [];

  get ordering(): string {
    return this.params.ordering!;
  }

  get startIndex() {
    return this.paginator.pageSize * this.paginator.pageIndex + 1;
  }

  get sortActive() {
    if (this.params?.ordering) {
      return this.ordering[0] === '-' ? this.ordering.slice(1) : this.ordering;
    } else {
      return null;
    }
  }

  get sortDirection() {
    if (this.params) {
      return this.ordering[0] === '-' ? 'desc' : 'asc';
    } else {
      return null;
    }
  }

  paginatorClicked() {
    this.params.paginationOption!.limit = this.paginator.pageSize;
    this.params.paginationOption!.offset =
      this.paginator.pageIndex * this.paginator.pageSize;

    this.paramsChange.emit(this.params);
    this.orderingChangedEvent?.emit(true);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data?.length;

    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

  expandRow(row: any) {
    if (this.checkRowExpansion(row)) {
      const expRow = this.expandedRowsArray.indexOf(row);
      this.expandedRowsArray.splice(expRow, 1);
    } else {
      this.expandedRowsArray.push(row);
    }
  }

  checkRowExpansion(row: any): boolean {
    for (let exp of this.expandedRowsArray) {
      if (exp === row) {
        return true;
      }
    }

    return false;
  }

  prepareTable(items: any, isExpandableTable: boolean) {
    if (this.isFirstLoad) {
      this.dataSource = isExpandableTable
        ? new TableSource(items)
        : new MatTableDataSource(items);
      if (this.sort) {
        this.runSort();
      }
    } else {
      this.dataSource.data = items;
    }
  }

  getOrderingParams(): string {
    if (this.sort.direction === 'desc') {
      return `-${this.sort.active}`;
    }

    return this.sort.active;
  }

  runSort() {
    if (this.isSortStarted) {
      return;
    }

    this.isSortStarted = true;

    this.sort.sortChange.pipe(untilDestroyed(this)).subscribe(() => {
      if (this.params && this.params.ordering) {
        this.params.ordering = this.getOrderingParams();
      } else {
        this.params.ordering = this.getOrderingParams();
      }
      this.paginator.pageIndex = 0;
      this.params.paginationOption!.limit = this.paginator.pageSize;
      this.params.paginationOption!.offset =
        this.paginator.pageIndex * this.paginator.pageSize;

      this.paramsChange.emit(this.params);
      this.orderingChangedEvent?.emit(true);
    });
  }
}
