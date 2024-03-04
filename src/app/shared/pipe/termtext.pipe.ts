import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termtext',
})
export class TermtextPipe implements PipeTransform {
  transform(text: string): string {
    return text.split(' ').slice(0, 2).join(' ');
  }
}
