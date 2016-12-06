import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LookupService } from '../../services/lookup.service';
import { OEventModel } from '../../models/oevent.model';
import { OEventService } from '../../services/oevent.service';
import { Router } from '@angular/router';

@Component({
    selector: 'oevent-list',
    templateUrl: './app/components/oeventList/oeventList.template.html',
    styleUrls: ['./app/components/oeventList/oeventList.style.css']
})
export class OEventListComponent {
    public oeventList: OEventModel[];
    public searchName: string;
    public searchVenue: string;
    public searchDateRange: string;
    public dateRangeList: string[];

    constructor(private oeventService: OEventService, private router: Router) {
        this.dateRangeList = ['Current', 'All', 'Past', 'Last 6 months', 'Next 6 months', 'Future']
    }

    ngOnInit() {
        this.searchDateRange = 'Current';
        this.searchOEvents();
    }

    public searchOEvents() {
        var searchDateFrom: Date;
        var searchDateTo: Date;

        switch (this.searchDateRange) {
            case 'Current':
                searchDateFrom = new Date();
                searchDateFrom.setDate(searchDateFrom.getDate() - 60);
                searchDateTo = new Date();
                searchDateTo.setDate(searchDateTo.getDate() + 180);
                break;
            case 'All':
                searchDateFrom = null;
                searchDateTo = null;
                break;
            case 'Past':
                searchDateFrom = null;
                searchDateTo = new Date();
                break;
            case 'Last 6 months':
                searchDateFrom = new Date();
                searchDateFrom.setDate(searchDateFrom.getDate() - (6 * 31));
                searchDateTo = new Date();
                break;
            case 'Next 6 months':
                searchDateFrom = new Date();
                searchDateTo = new Date();
                searchDateTo.setDate(searchDateTo.getDate() + (6 * 31));
                break;
            case 'Future':
                searchDateFrom = new Date();
                searchDateTo = null;
                break;
            default:
                searchDateFrom = null;
                searchDateTo = null;
                break;
        }



        this.oeventService.getOEvent(null, this.searchName, this.searchVenue, searchDateFrom, searchDateTo)
            .then(data => {
                data.subscribe(oeventData => {
                    this.oeventList = oeventData.json();
                })
            });
    }

    public dateRangeChange(event) {
        this.searchDateRange = event.target.value;
        this.searchOEvents();
    }

    public oeventClick(oeventId: number) {
        this.router.navigate(['/events', oeventId])
    }
    public newOEvent() {
        this.router.navigate(['/events', '0'])
    }
}
