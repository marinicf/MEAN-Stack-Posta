import { Pipe, PipeTransform } from '@angular/core';
import { Ured } from './ured.model';

@Pipe({
  name: 'pipeTest'
})
export class PipeTest implements PipeTransform {

  transform(value: String[], searchText: string): unknown {
    if (!value) {
      return [];
    }
    if (!searchText) {
      return value;
    }
    searchText = searchText.toLocaleLowerCase();

    return value.filter(it => {
      return it.toLocaleLowerCase().includes(searchText);
    });
  }

}
