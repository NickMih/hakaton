import { Pipe, PipeTransform } from '@angular/core';
import {dateToString} from "../../utils";


@Pipe({
  name: 'formatDateTime'
})
export class FormatDateTimePipe implements PipeTransform {
  transform(date: Date | string): string {
    if (!date) {
      return '';
    }
    if (typeof date === 'string') {
      date = new Date(date);
    }

    return dateToString(date, 'dd/MM/yyyy HH:mm:ss');
  }
}
