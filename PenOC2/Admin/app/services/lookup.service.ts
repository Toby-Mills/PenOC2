import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UrlService } from '../services/url.service';
import { ClubModel } from '../models/club.model';
import { VenueModel } from '../models/venue.model';

@Injectable()
export class LookupService {
    public genderList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
    public technicalDifficultyList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
    public clubList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
    public venueList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);

    private headers: Headers;

    constructor(private http: Http, private urlService: UrlService) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        this.getGenderList();
        this.getTechnicalDifficultyList();
        this.getClubList();
        this.getVenueList();
    }

    getVenueList(): Promise<Boolean> {
        return Promise.resolve(
            this.http.get(this.urlService.apiUrl() + '/Venues')
        ).then(data => data.subscribe(
            response => {
                let venueData: Array<VenueModel> =  response.json();
                venueData.sort(function(a: VenueModel, b: VenueModel){
                    if (a.name === null) {a.name = ''; } ;
                    if (b.name === null) {b.name = ''; } ;
                    if ( a.name.toLowerCase() < b.name.toLowerCase() ) {return -1; };
                    if ( a.name.toLowerCase() > b.name.toLowerCase() ) {return 1; };
                    return 0;
                });
                this.venueList.next(venueData);
            }
        )).then(success => {return true; });
    }

    getClubList(): Promise<Boolean> {
        return Promise.resolve(
            this.http.get(this.urlService.apiUrl() + '/Clubs')
        ).then(data => data.subscribe(
            response => {
                let clubData: Array<ClubModel> = response.json();
                clubData.sort(function(a: ClubModel, b: ClubModel){
                    if ( a.shortName < b.shortName ) {return -1; };
                    if ( a.shortName > b.shortName ) {return 1; };
                    return 0;
                });
                this.clubList.next(clubData);
            }
        )).then(success => {return true; });
    }

    postClub(club: ClubModel): Promise<Boolean> {
        return Promise.resolve(
            this.http.post(this.urlService.apiUrl() + '/Clubs', JSON.stringify(club), { headers: this.headers })
        ).then(data => {
                data.subscribe(response => {
                    this.getClubList();
                });
            }).then(data => { return true; });
    }

    putClub(club: ClubModel): Promise<Boolean> {
        return Promise.resolve(
            this.http.put(this.urlService.apiUrl() + '/Clubs', JSON.stringify(club), { headers: this.headers })
        ).then(data => {
                data.subscribe(response => {
                    this.getClubList();
                });
            }).then(success => {return true; });
    }

    deleteClub(clubId: Number): Promise<Boolean> {
        return Promise.resolve(
            this.http.delete(this.urlService.apiUrl() + ' /Clubs/' + clubId)
        ).then(data => {
                data.subscribe(response => {
                    this.getClubList();
                });
            }).then(success => {return true; });
    }

    postVenue(venue: VenueModel): Promise<Boolean> {
        return Promise.resolve(
            this.http.post(this.urlService.apiUrl() + '/Venues', JSON.stringify(venue), { headers: this.headers })
        ).then(data => {
                data.subscribe(response => {
                    this.getVenueList();
                });
            }).then(data => { return true; });
    }

    putVenue(venue: VenueModel): Promise<Boolean> {
        return Promise.resolve(
            this.http.put(this.urlService.apiUrl() + '/Venues', JSON.stringify(venue), { headers: this.headers })
        ).then(data => {
                data.subscribe(response => {
                    this.getVenueList();
                });
            }).then(success => {return true; });
    }

    deleteVenue(venueId: Number): Promise<Boolean> {
        return Promise.resolve(
            this.http.delete(this.urlService.apiUrl() + '/Venues/' + venueId)
        ).then(data => {
                data.subscribe(response => {
                    this.getVenueList();
                });
            }).then(success => {return true; });
    }

    getTechnicalDifficultyList(): Promise<Boolean> {
        return Promise.resolve(
            this.http.get(this.urlService.apiUrl() + '/TechnicalDifficulties')
        ).then(data => data.subscribe(
            technicalDifficultyData => {
                this.technicalDifficultyList.next(technicalDifficultyData.json());
            }
        )).then(success => {return true; });
    }

    getGenderList(): Promise<Boolean> {
        return Promise.resolve(
            this.http.get(this.urlService.apiUrl() + '/Genders')
        ).then(data => data.subscribe(
            genderData => {
                this.genderList.next(genderData.json());
            }
        )).then(success => {return true; });
    }
}
