import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NewsModel } from '../models/news.model';
import { UrlService } from '../services/url.service';

@Injectable()
export class NewsService {

    private headers: Headers;

    constructor(private http: Http, private urlService:UrlService) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    getNewsItems(newsItemId?: Number,  dateFrom?: Date, dateTo?: Date) {

         var url = this.urlService.apiUrl() + '/NewsItems?';
         if (newsItemId != null){url += 'id=' + newsItemId}
         if (dateFrom != null){url += '&dateFrom=' + dateFrom.getFullYear() + '-' + (dateFrom.getMonth() + 1) + '-' + dateFrom.getDate()}
         if (dateTo != null){url += '&dateTo=' + dateTo.getFullYear() + '-' + (dateTo.getMonth() + 1) + '-' + dateTo.getDate()}

        return Promise.resolve(         
                this.http.get( url)
        )
    }

    putNewsItem(newsItem: NewsModel){
        return Promise.resolve(
            this.http.put(this.urlService.apiUrl() + '/NewsItems',JSON.stringify(newsItem), { headers: this.headers })
        )
    }

    postNewsItem(newsItem: NewsModel){
        return Promise.resolve(
            this.http.post(this.urlService.apiUrl() + '/NewsItems', JSON.stringify(newsItem), {headers: this.headers})
        )
    }

}