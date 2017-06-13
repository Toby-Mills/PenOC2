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
    public venueList: Array<VenueModel>;
    public tab: string = 'venues';

    constructor(public lookupService: LookupService) {

    }

    ngOnInit() {
        this.lookupService.clubList.subscribe(data => this.clubList = data);
        this.lookupService.venueList.subscribe(data => this.venueList = data);
    }

    saveClub(club: ClubModel, shortName: string, fullName: string) {
        club.shortName = shortName;
        club.fullName = fullName;

        this.lookupService.putClub(club);
    }

    deleteClub(club: ClubModel) {
        this.lookupService.deleteClub(club.id);
    }

    saveVenue(venue: VenueModel, name: string) {
        venue.name = name;

        this.lookupService.putVenue(venue);
    }

    createVenue(name: string) {
        let venue = new VenueModel();
        venue.name = name;

        this.lookupService.postVenue(venue);
    }

    deleteVenue(venue: VenueModel) {
        this.lookupService.deleteVenue(venue.id);
    }
}
