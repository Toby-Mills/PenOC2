import { Component } from '@angular/core';
import { LookupService } from '../../services/lookup.service';
import { ClubModel } from '../../models/club.model';
import { VenueModel } from '../../models/venue.model';

@Component({
    moduleId: module.id,
    selector: 'lookup-editor',
    templateUrl: './lookup-editor.template.html',
    styleUrls: ['./lookup-editor.style.css']
})
export class LookupEditorComponent {
    public clubList: Array<ClubModel>;
    public newClub: ClubModel;
    public venueList: Array<VenueModel>;
    public newVenue: VenueModel;
    public tab: string = 'venues';

    constructor(public lookupService: LookupService) {

    }

    ngOnInit() {
        this.lookupService.clubList.subscribe(data => this.clubList = data);
        this.newClub = new ClubModel;
        this.lookupService.venueList.subscribe(data => this.venueList = data);
        this.newVenue = new VenueModel;
    }

    saveClub(club: ClubModel, shortName: string, fullName: string) {
        club.shortName = shortName;
        club.fullName = fullName;

        this.lookupService.putClub(club);
    }

    createClub() {
        this.lookupService.postClub(this.newClub).then(success => {
            if (success) {this.newClub = new ClubModel(); };
        });
    }

    deleteClub(club: ClubModel) {
        this.lookupService.deleteClub(club.id);
    }

    saveVenue(venue: VenueModel, name: string) {
        venue.name = name;

        this.lookupService.putVenue(venue);
    }

    createVenue() {

        this.lookupService.postVenue(this.newVenue).then(success => {
            if (success) {this.newVenue = new VenueModel(); };
        });
    }

    deleteVenue(venue: VenueModel) {
        this.lookupService.deleteVenue(venue.id);
    }
}
