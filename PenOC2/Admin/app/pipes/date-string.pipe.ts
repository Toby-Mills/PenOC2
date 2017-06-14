import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({ name: 'dateString' })
export class DateStringPipe implements PipeTransform {
    transform(dateString: string, format: string): string {
        let parsedDate = Date.parse(dateString);
        if (isNaN(parsedDate)) {
            return '';
        } else {
            return new DatePipe('za').transform(new Date(parsedDate), format);
        }
    }
}
