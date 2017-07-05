import { Injectable } from '@angular/core';
import { NewsModel } from '../models/news.model';
import { ApiService } from '../services/api.service';

@Injectable()
export class NewsService {

    constructor( private apiService: ApiService) {
    }

    getNewsItems(newsItemId?: Number,  dateFrom?: Date, dateTo?: Date) {

         let url = '/NewsItems?';
         if (newsItemId != null) {url += 'id=' + newsItemId; }
         if (dateFrom != null) {url += '&dateFrom=' + dateFrom.getFullYear() + '-' + (dateFrom.getMonth() + 1) + '-' + dateFrom.getDate(); }
         if (dateTo != null) {url += '&dateTo=' + dateTo.getFullYear() + '-' + (dateTo.getMonth() + 1) + '-' + dateTo.getDate(); }

        return Promise.resolve(
                this.apiService.get( url)
        );
    }

    putNewsItem(newsItem: NewsModel) {
        return Promise.resolve(
            this.apiService.put('/NewsItems', JSON.stringify(newsItem))
        );
    }

    postNewsItem(newsItem: NewsModel) {
        return Promise.resolve(
            this.apiService.post('/NewsItems', JSON.stringify(newsItem))
        );
    }
}
