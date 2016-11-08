import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
 
@Pipe({ name: 'resultTime' })
export class resultTime implements PipeTransform {
    transform(dateString: string): String {
        var parsedString: number = Date.parse(dateString);
        var parsedDate: Date = new Date();
        var returnString: String;
        
        if (isNaN(parsedString)) {
            return "";
        }
        else {
            parsedDate = new Date(parsedString);
            returnString = parsedDate.getUTCHours() + ":" + parsedDate.getMinutes() + ":" + parsedDate.getSeconds()
            return returnString;
        }
    }
}