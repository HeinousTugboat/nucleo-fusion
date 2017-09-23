import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trunc'
})
export class TruncPipe implements PipeTransform {

  transform(value: number, acc: number): any {
    return value.toPrecision(acc + 1);
  }

}
