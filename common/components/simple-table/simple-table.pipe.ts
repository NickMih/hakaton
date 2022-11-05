import { Pipe, PipeTransform } from '@angular/core';
import { ISimpleColumn } from './simple-table.component';
import {dateToString} from "../../utils";

@Pipe({
  name: 'simpleValue'
})
export class SimpleValuePipe implements PipeTransform {
  transform(el: any, column: ISimpleColumn): any {
    const value = column.subField ? el[column.name] ? el[column.name][column.subField] : '' : el[column.name];

    if (value instanceof Date) {
      return dateToString(value, 'dd.MM.yyyy');
    }

    return value;
  }
}
