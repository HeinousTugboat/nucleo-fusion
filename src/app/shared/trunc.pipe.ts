import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trunc'
})
export class TruncPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
