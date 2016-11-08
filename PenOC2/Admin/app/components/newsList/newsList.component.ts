import { Component } from '@angular/core';
import { NewsModel } from '../../models/news.model';
import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';

@Component({
    selector: 'news-list',
    templateUrl: './app/components/newsList/newsList.template.html',
    styleUrls: ['./app/components/newsList/newsList.style.css']
})
export class NewsListComponent {
    private newsList: Array<NewsModel>= new Array();

 public constructor(public newsService: NewsService, private router:Router) {}

    ngOnInit() {
        this.newsService.getNewsItems(null, null, new Date()).then(data => data.subscribe(newsData => {
            this.newsList = newsData.json();
        }));
    }

    public newsItemClick(newsItemId: number){
        this.router.navigate(['/news', newsItemId]);
    }

    public newNewsItem(){
        this.router.navigate(['/news/new'])
    }
}