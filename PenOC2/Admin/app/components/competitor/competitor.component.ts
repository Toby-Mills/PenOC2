import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { LookupService } from '../../services/lookup.service';
import { CompetitorService } from '../../services/competitor.service';
import { CompetitorModel } from '../../models/competitor.model';

import { Observable } from 'rxjs';

//---------------------------------------------------------------------------------------
@Component({
    selector: 'competitor',
    templateUrl: './app/components/competitor/competitor.template.html',
    styleUrls: ['./app/components/competitor/competitor.style.css']
})
export class CompetitorComponent {
    @Input() competitorId: Number;
    @Input() peopleOnly: boolean = false;
    @Output() competitorIdChange = new EventEmitter();

    public competitor: CompetitorModel;
    public searchString: String = "";
    public searchActive: boolean;
    public matchIndex: number;
    public newCompetitor: CompetitorModel;
    public genderList: Array<Object>;
    public delayedDisplay: any;
    public delayedHide: any;
    public allCompetitors: CompetitorModel[];

    constructor(private lookupService: LookupService, private competitorService: CompetitorService) {
        this.competitor = new CompetitorModel;
    }

    ngOnInit() {
        this.competitorService.allCompetitors.subscribe(data => this.allCompetitors = data);
        this.lookupService.genderList.subscribe(data => this.genderList = data);

        this.loadCompetitor();
    }

    public loadCompetitor() {
        if (this.competitorId > 0) {
            this.competitorService.allCompetitors
                .subscribe(competitors => {
                    if (competitors) {
                        this.competitor = competitors.find(competitor => { return (competitor.id == this.competitorId) });
                    }
                })
        } else {
            this.competitor = null;
        }
    }

    public delayedActivateSearch(active: boolean) {
        var self;
        self = this;

        if (active) {
            clearTimeout(self.delayedHide);
            self.delayedDisplay = setTimeout(function () {
                if (!self.searchActive) { self.activateSearch(true) }
            }, 300)
        } else {
            clearTimeout(self.delayedDisplay);
            self.delayedHide = setTimeout(function () {
                self.activateSearch(false);
            }, 500)
        }
    }

    public activateSearch(active: boolean) {

        if (active) {
            this.loadCompetitor();
            if (this.competitor) {
                this.searchString = this.competitor.fullName;
                this.lookupName(this.searchString);
            }
        } else {
            this.newCompetitor = null;
        }
        this.searchActive = active;
    }

    public lookupName(name: String) {
        this.matchIndex = -1;
    }

    public selectCompetitor(competitor: CompetitorModel) {
        this.competitor = competitor;
        this.competitorId = this.competitor.id;
        this.competitorIdChange.emit({ value: this.competitor });
        this.activateSearch(false);
    }

    public clearClicked(event: MouseEvent) {
        if (event.detail == 1) { //event.detail = number of clicks. MouseEvent triggered by a keyPress will have detail = 0
            this.clearCompetitor();
        }
    }

    public clearCompetitor() {
        this.competitor = null;
        this.searchString = "";
        this.competitorIdChange.emit({ value: this.competitor });
    }

    public keyPressed(event) {
        if (event.key == "ArrowDown") {
            this.matchIndex++;
        } else if (event.key == "ArrowUp") {
            if (this.matchIndex > 0) {
                this.matchIndex--;
            }
        } else if (event.key == "Enter") {
            this.selectCompetitor(this.allCompetitors.filter(competitor => { return new RegExp(this.searchString.toLowerCase()).test(competitor.fullName.toLowerCase()) })[this.matchIndex])
        }
    }

    public newClicked() {
        this.newCompetitor = new CompetitorModel;
    }

    public cancelNewCompetitor() {
        this.newCompetitor = null;
    }

    public saveNewCompetitor() {
        if (this.newCompetitor.genderId == 3) { this.newCompetitor.firstName = ''; }
        this.newCompetitor.fullName = (this.newCompetitor.firstName > "" ? this.newCompetitor.firstName + ' ' : '');
        this.newCompetitor.fullName = this.newCompetitor.fullName + this.newCompetitor.surname;
        this.competitorService.postCompetitor(this.newCompetitor).subscribe(data => {
            this.selectCompetitor(data.json());
            this.competitorService.getAllCompetitors();
        })
    }
}
