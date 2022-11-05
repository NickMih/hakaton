import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simpleFunctionValue'
})
export class SimpleFunctionValuePipe implements PipeTransform {

  transform(value: any, func: Function): string {
    return func(value);
  }
}
