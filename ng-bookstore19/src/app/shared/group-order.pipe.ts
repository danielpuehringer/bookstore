import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "./order";

@Pipe({
  name: 'groupOrder'
})
export class GroupOrderPipe implements PipeTransform {

  transform(array: Order[], args?: any): Order[] {
      return array.sort(function(a, b){
          return a.user_id - b.user_id;
      });
  }

}
