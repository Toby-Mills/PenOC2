import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'ResultTime' })
export class ResultTimePipe implements PipeTransform {
    transform(dateString: string): String {
        let parsedString: number = Date.parse(dateString);
        let parsedDate: Date = new Date();
        let returnString: String;

        if (isNaN(parsedString)) {
            return '';
        } else {
            parsedDate = new Date(parsedString);
            returnString = parsedDate.getUTCHours() + ':' + parsedDate.getMinutes() + ':' + parsedDate.getSeconds();
            return returnString;
        }
    }
}
