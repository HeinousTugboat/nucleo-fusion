import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'delay'
})
export class DelayPipe implements PipeTransform {

  transform(num: number): any {
    if (num === Infinity) {
      return 'never';
    } else if (num <= 0) {
      return 'now';
    } else if (num < 60) { // < 1 minute
      return num + 's';
    } else if (num < 60 * 60) { // < 1 hour
      return Math.floor(num / 60) + 'm';
    } else if (num < 60 * 60 * 24) { // < 1 day
      return Math.floor(num / (60 * 60)) + 'h';
    } else if (num < 60 * 60 * 24 * 7) { // < 1 week
      return Math.floor(num / (60 * 60 * 24)) + 'd';
    } else if (num < 60 * 60 * 24 * 30) { // < 1 month
      return Math.floor(num / (60 * 60 * 24 * 7)) + 'wks';
    } else if (num < 60 * 60 * 24 * 365.2425) { // < 1 year
      return Math.floor(num / (60 * 60 * 24 * 30)) + 'mos';
    } else {
      return Math.floor(num / (60 * 60 * 24 * 365.2425)) + 'yrs';
    }
  }

}
