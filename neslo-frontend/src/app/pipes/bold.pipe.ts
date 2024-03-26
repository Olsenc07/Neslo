import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bold',
  standalone: true
})
export class BoldPipe implements PipeTransform {
  transform(list: string, input: string): string {
    //  g is global and i is case-insensitive
    const matchOptions: RegExp = new RegExp(input, 'gi');
    const boldedValueInList = (item: string) =>
      item.replace(matchOptions, (match: string) => `<b>${match}</b>`);
    return boldedValueInList(list);
  }
}
