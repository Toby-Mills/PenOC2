import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {OEventModel} from '../models/oevent.model';
import { UrlService } from '../services/url.service';

@Injectable()
export class OEventService {
    private headers: Headers;
    
    constructor(private http: Http, private urlService:UrlService) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
     }
    
    getOEvent(oeventId?: Number, name?: String, venue?: String, dateFrom?: Date, dateTo?: Date) {
         var url = this.urlService.apiUrl() + '/OEvents?';
         if (oeventId != null){url += 'id=' + oeventId}
         if (name != null){url += '&name=' + name}
         if (venue != null){url += '&venue=' + venue}
         if (dateFrom != null){url += '&dateFrom=' + dateFrom.getFullYear() + '-' + (dateFrom.getMonth() + 1) + '-' + dateFrom.getDate()}
         if (dateTo != null){url += '&dateTo=' + dateTo.getFullYear() + '-' + (dateTo.getMonth() + 1) + '-' + dateTo.getDate()}
         
        return Promise.resolve(        
                this.http.get( url)
        )
    }

    putOEvent(oevent: OEventModel){
        return Promise.resolve(
           this.http.put(this.urlService.apiUrl() +'/OEvents/',JSON.stringify(oevent), { headers: this.headers })
        )
    }

    postOEvent(oevent: OEventModel) {
        return Promise.resolve(
            this.http.post(this.urlService.apiUrl() +'/OEvents/', JSON.stringify(oevent), { headers: this.headers })
        )
    }
}