import { Component } from '@angular/core';
import { CompetitorModel } from '../../models/competitor.model';
import { CompetitorService } from '../../services/competitor.service';
import { Router } from '@angular/router';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CompetitorComponent } from '../competitor/competitor.component';

@Component({
    moduleId: module.id,
    selector: 'competitor-list',
    templateUrl: './competitor-list.template.html',
    styleUrls: ['./competitor-list.style.css']
})
export class CompetitorListComponent {

public allCompetitors: CompetitorModel[];
public editingCompetitor: CompetitorModel;

public constructor(public competitorService: CompetitorService, private router: Router) {}

    ngOnInit() {
        this.competitorService.allCompetitors.subscribe(data => {
            this.allCompetitors = data;
            console.log('updated');
        });
    }

    public editCompetitor(competitorId: Number) {
        this.competitorService.getCompetitor(competitorId).then(data => data.subscribe(
            competitorData => {
                this.editingCompetitor = competitorData.json()[0];
            }
        ));
    }

    public competitorSaved() {
        this.editingCompetitor = undefined;
    }

    public editCancelled() {
        this.editingCompetitor = undefined;
    }

    public newCompetitor() {
        this.editingCompetitor = new CompetitorModel();
    }

    public deleteCompetitor(competitorId: Number) {
        console.log ('delete');
        this.competitorService.deleteCompetitor(competitorId).subscribe(data => { this.competitorService.getAllCompetitors(); });
    }
}
