﻿import { Component } from '@angular/core';
import { LookupService } from '../../services/lookup.service';
import { OEventModel } from '../../models/oevent.model';
import { CompetitorModel } from '../../models/competitor.model';
import { OEventService } from '../../services/oevent.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'oevent',
    templateUrl: './app/components/oevent/oevent.template.html',
    styleUrls: ['./app/components/oevent/oevent.style.css']
})
export class OEventComponent {
    private oevent: OEventModel;
    public venueList: Array<Object>;
    public clubList: Array<Object>;
    public loadOEventId: number;

    constructor(private lookupService: LookupService, private oeventService: OEventService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): any {
        this.lookupService.venueList.subscribe(venueData => this.venueList = venueData);
        this.lookupService.clubList.subscribe(clubData => this.clubList = clubData);
        this.loadOEvent();
    }

    private loadOEvent() {
        this.route.params.forEach((params: Params) => {
            let id = + params['eventId'];
            if (id > 0) {
                this.oeventService.getOEvent(id).then((data) => {
                    data.subscribe((eventData) => {
                        this.oevent = eventData.json()[0];
                        this.oevent.date = new Date(this.oevent.date).toISOString().substring(0, 10);
                    })
                })
            } else {
                this.oevent = new OEventModel();
            }
        })
    }

    public saveClicked() {
        this.upsertOEvent();
    }

    public cancelClicked() {
        this.loadOEvent();
    }

    public coursesClicked() {
        this.router.navigate(["/events", this.oevent.id, "courses"]);
    }

    public plannerSelected(planner: CompetitorModel) {
        if (planner) {
            this.oevent.plannerId = planner.id;
        } else {
            this.oevent.plannerId = null;
        }
    };

    public controllerSelected(controller: CompetitorModel) {
        if (controller) {
            this.oevent.controllerId = controller.id;
        } else {
            this.oevent.controllerId = null;
        }

    };

    public upsertOEvent(): void {
        if (this.oevent.id > 0) {
            this.saveOEvent();
        } else {
            this.createOEvent();
        }
    }

    public saveOEvent(): void {
        this.oeventService.putOEvent(this.oevent)
            .then(data => {
                data.subscribe()
            });
    }

    public createOEvent(): void {
        this.oeventService.postOEvent(this.oevent)
            .then(data => {
                data.subscribe();
            });
    }

}
