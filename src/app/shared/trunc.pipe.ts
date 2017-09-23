import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trunc'
})
export class TruncPipe implements PipeTransform {

  transform(value: number, acc: number = 3): any {
    return value.toPrecision(acc + 1);
  }

}
