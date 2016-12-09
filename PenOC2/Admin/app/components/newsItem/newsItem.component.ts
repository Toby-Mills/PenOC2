import { Component } from '@angular/core';
import { NewsModel } from '../../models/news.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NewsService } from '../../services/news.service';

@Component({
    selector: 'news-item',
    templateUrl: './app/components/newsItem/newsItem.template.html',
    styleUrls: ['./app/components/newsItem/newsItem.style.css']
})
export class NewsItemComponent {
    public newsItem: NewsModel;

    public constructor(private newsService: NewsService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.loadNewsItem();
    }

public loadNewsItem() {
this.route.params.forEach((params: Params) => {
            let id = + params['id'];
            if (id > 0) {
                this.newsService.getNewsItems(id).then((data) => {
                    data.subscribe((newsData) => {
                        this.newsItem = newsData.json()[0];
                        this.newsItem.date = new Date(this.newsItem.date).toISOString().substring(0, 10);
                    });
                });
            } else {
                this.newsItem = new NewsModel();
            }

        })
}
    public backClicked() {
        this.router.navigate(['/news'])
    }

    public cancelClicked() {
        this.loadNewsItem();
    }

    public saveClicked() {
        if (this.newsItem.id > 0) {
            this.saveNewsItem();
        } else {
            this.createNewsItem();
        }
    }

    public saveNewsItem(): void {
        this.newsService.putNewsItem(this.newsItem)
            .then(data => {
                data.subscribe(() => { this.loadNewsItem() })
            });
    }
    public createNewsItem(): void {
        this.newsService.postNewsItem(this.newsItem)
            .then(data => {
                data.subscribe(() => { this.loadNewsItem(); });
            });
    }
}
