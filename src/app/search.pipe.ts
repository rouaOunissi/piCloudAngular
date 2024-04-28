import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value)return null;
    if (!args)return value;

    args= args.toLowerCase();
    return value.filter(function(ressource : any)
    {
      return JSON.stringify(ressource.titre).toLowerCase().includes(args);
    })
  }

}
