import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { BaseTableComponent } from '../base-table';
import { TopicsApi } from '../../server-api/topics.api';
import { SelectionModel } from '@angular/cdk/collections';
import { isOnChanges } from '../../common/utils';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DefaultParams } from '../../common/default.models';

export interface ISimpleColumn {
  name: string;
  label: string;
  subField?: string;
  width?: string | number;
  isSortable?: boolean;
  icon?: string;
  tooltip?: Function;
  color?: 'primary' | 'warn' | 'accent';

  // функция для *ngIf
  isShow?: Function;

  cellClick?: Function;

  // функция, которая необходима если значение нужно смапить со справочника на фронте
  // или выполнить математические или преобразовательные значения.
  // Она посылается в чистый пайп, поэтому вопроса оптимизации не стоит
  functionPipe?: Function;
}
@Component({
  selector: 'simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
})
export class SimpleTableComponent
  extends BaseTableComponent
  implements OnChanges, AfterViewInit
{
  @Input() columns: ISimpleColumn[];
  @Input() source: any;
  @Input() selection: SelectionModel<any>;
  @Input() params: DefaultParams;
  @Input() actions: any;
  // Т.к. компонент переиспользуется много где, то из-за фильтров его размер варьируется
  @Input() tableHeight: string;
  @Input() noDataTitle: string = 'Данных нет';

  @Input() rowClassFunction: (item) => { [key: string]: boolean };

  @Output() paramsChange: EventEmitter<any> = new EventEmitter();
  @Output() orderingChangedEvent: EventEmitter<any> = new EventEmitter();
  @Output() selectionChange: EventEmitter<SelectionModel<TopicsApi>> =
    new EventEmitter<SelectionModel<TopicsApi>>();
  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  dataSource;
  displayedColumns: string[] = [];

  constructor(private router: Router) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isOnChanges(changes.columns)) {
      this.displayedColumns = this.columns.map((el) => el.name);
    }
    if (isOnChanges(changes.selection)) {
      this.displayedColumns.unshift('selection');
    }
    if (changes) {
      this.prepareTable(this.source, false);
    }
  }

  isRoute(path: string): boolean {
    return this.router.url.includes(path);
  }

  onCellClick($event, column, element): void {
    if (column.cellClick) {
      column.cellClick(element);
      $event.stopPropagation();
    }
  }

  ngAfterViewInit(): void {
    this.runSort();
  }
}
