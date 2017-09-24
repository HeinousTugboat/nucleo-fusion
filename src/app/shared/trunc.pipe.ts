import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trunc'
})
export class TruncPipe implements PipeTransform {

  transform(value: number, acc: number = 3): any {
    if (value < Math.pow(10, acc)) {
      return Math.floor(value);
    } else {
      return value.toPrecision(acc + 1);
    }
  }

}
