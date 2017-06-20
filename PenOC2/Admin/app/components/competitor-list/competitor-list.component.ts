import { Component } from '@angular/core';
import { CompetitorModel } from '../../models/competitor.model';
import { CompetitorService } from '../../services/competitor.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    moduleId: module.id,
    selector: 'competitor-list',
    templateUrl: './competitor-list.template.html',
    styleUrls: ['./competitor-list.style.css']
})
export class CompetitorListComponent {

public allCompetitors: CompetitorModel[];

public constructor(public competitorService: CompetitorService, private router: Router) {}

    ngOnInit() {
        this.competitorService.allCompetitors.subscribe(data => this.allCompetitors = data);
    }

    public newsItemClick(newsItemId: number){
        this.router.navigate(['/news', newsItemId]);
    }

    public newNewsItem(){
        this.router.navigate(['/news/new'])
    }
}