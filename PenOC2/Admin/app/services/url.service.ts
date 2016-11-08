import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {
    apiUrl():string{
        if (location.host.toLowerCase().startsWith("localhost")) {
            return "http://localhost/penoc2/api"
        }else{
            return "http://www.penoc.org.za/api"
        }
    }
}