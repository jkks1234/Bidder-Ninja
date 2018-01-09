import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(product: any, term: any): any {
    console.log(term);
    if(term===undefined )
    	         return product;
   return product.filter(function(x)
    {
     console.log('here1');
    	return x.name.toLowerCase().includes(term.toLowerCase());
    })
  }

}
