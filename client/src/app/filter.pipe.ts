import { Pipe, PipeTransform } from '@angular/core';
import { Ured } from './ured.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Ured[], searchText: string): unknown {
    if (!value) {
      return [];
    }
    if (!searchText) {
      return value;
    }
    searchText = searchText.toLocaleLowerCase();

    return value.filter(it => {
      if(it.grad){
        return it.grad.toLocaleLowerCase().includes(searchText);
      }

    });
  }

}
