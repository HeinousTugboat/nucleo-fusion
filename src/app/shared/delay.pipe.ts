import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'delay'
})
export class DelayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
