import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {OEventModel} from '../models/oevent.model';
import { ApiService } from '../services/api.service';

@Injectable()
export class OEventService {

    constructor( private apiService: ApiService) {
     }

    getOEvent(oeventId?: Number, name?: String, venue?: String, dateFrom?: Date, dateTo?: Date) {

         let url = '/OEvents?';
         if (oeventId != null) {url += 'id=' + oeventId; }
         if (name != null) {url += '&name=' + name; }
         if (venue != null) {url += '&venue=' + venue; }
         if (dateFrom != null) {url += '&dateFrom=' + dateFrom.getFullYear() + '-' + (dateFrom.getMonth() + 1) + '-' + dateFrom.getDate(); }
         if (dateTo != null) {url += '&dateTo=' + dateTo.getFullYear() + '-' + (dateTo.getMonth() + 1) + '-' + dateTo.getDate(); }

        return Promise.resolve(
                this.apiService.get(url)
        );
    }

    putOEvent(oevent: OEventModel) {
        return Promise.resolve(
           this.apiService.put('/OEvents/', JSON.stringify(oevent))
        );
    }

    postOEvent(oevent: OEventModel) {
        return Promise.resolve(
            this.apiService.post('/OEvents/', JSON.stringify(oevent))
        );
    }
}
