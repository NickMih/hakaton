import {SimpleChange} from "@angular/core";
import { format, isDate } from 'date-fns';
import { ru as locale } from 'date-fns/locale';
import {DefaultParams} from "./default-models";
import {map, Observable} from "rxjs";
import {IDefaultResponse} from "../statistics/statistic.api";
import {tap} from "rxjs/operators";


export function isOnChanges(simpleChange: SimpleChange): boolean {
  return (
    simpleChange &&
    simpleChange.currentValue &&
    simpleChange.currentValue !== simpleChange.previousValue
  );
}

export function dateToString(value: number | Date, strFormat: string = 'yyyy-MM-dd'): string {
  if (value instanceof Number || isDate(value)) {
    return format(value, strFormat, {locale});
  }

  return '';
}

// оператор для сета пагинатора
export function setPaginatorParams(params: Partial<DefaultParams>) {
  return function (res: Observable<IDefaultResponse<any>>) {
    return res.pipe(
      tap((_res) =>
        params.paginationOption
          ? (params.paginationOption.length = _res.count)
          : false
      ),
      map((_res) => _res.results)
    );
  };
}
