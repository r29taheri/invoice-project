import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortening'
})
export class ShorteningPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 70) {
      return value.substring(0, 70) + '...';
    }
    return value;
  }

}
