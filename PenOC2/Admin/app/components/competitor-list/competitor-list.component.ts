import { Component, ViewChild } from '@angular/core';
import { CompetitorModel } from '../../models/competitor.model';
import { CompetitorService } from '../../services/competitor.service';
import { Router } from '@angular/router';
import { ModalMessageBoxComponent } from '../modal-message-box/modal-message-box.component';

@Component({
    moduleId: module.id,
    selector: 'competitor-list',
    templateUrl: './competitor-list.template.html',
    styleUrls: ['./competitor-list.style.css']
})
export class CompetitorListComponent {
    @ViewChild(ModalMessageBoxComponent) confirmDelete: ModalMessageBoxComponent;
    public allCompetitors: CompetitorModel[];
    public editingCompetitor: CompetitorModel;
    private deletingCompetitor: number;
    public constructor(public competitorService: CompetitorService, private router: Router) {}

    ngOnInit() {
        this.competitorService.allCompetitors.subscribe(data => {
            this.allCompetitors = data;
        });
    }

    public editCompetitor(event: MouseEvent, competitorId: Number) {
        if (event.srcElement.nodeName.toLowerCase() === 'td'){
            this.competitorService.getCompetitor(competitorId).then(data => data.subscribe(
                competitorData => {
                    this.editingCompetitor = competitorData.json()[0];
                }
            ));
        }
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

    public deleteClicked(competitor: CompetitorModel) {
        this.deletingCompetitor = competitor.id;
        this.confirmDelete.messageText = 'Are you sure you want to delete competitor "' + competitor.fullName + '"?';
        this.confirmDelete.display();
    }

    public deleteCompetitor(competitorId: Number) {
        this.competitorService.deleteCompetitor(competitorId).subscribe(data => { this.competitorService.getAllCompetitors(); });
    }

    public deleteCompetitorConfirmed() {
        this.deleteCompetitor(this.deletingCompetitor);
    }
}
