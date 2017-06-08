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

    getVenueList() {
        Promise.resolve(
            this.http.get(this.urlService.apiUrl() + '/Venues')
        ).then(data => data.subscribe(
            venueData => {
                this.venueList.next(venueData.json());
            }
        ))
    }

    getClubList() {
        Promise.resolve(
            this.http.get(this.urlService.apiUrl() + '/Clubs')
        ).then(data => data.subscribe(
            clubData => {
                this.clubList.next(clubData.json());
            }
        ))
    }

    postClub(club: ClubModel) {
        Promise.resolve(
            this.http.post(this.urlService.apiUrl() + '/Clubs', JSON.stringify(club), { headers: this.headers })
        ).then(data => {
                data.subscribe(response => {
                    this.getClubList();
                });
            });
    }

    putClub(club: ClubModel) {
        Promise.resolve(
            this.http.put(this.urlService.apiUrl() + '/Clubs', JSON.stringify(club), { headers: this.headers })
        ).then(data => {
                data.subscribe(response => {
                    this.getClubList();
                });
            });
    }

    deleteClub(clubId: Number) {
        Promise.resolve(
            this.http.delete(this.urlService.apiUrl() +' /Clubs/' + clubId)
        ).then(data => {
                data.subscribe(response => {
                    this.getClubList();
                });
            });
    }

    postVenue(venue: VenueModel) {
        Promise.resolve(
            this.http.post(this.urlService.apiUrl() + '/Venues', JSON.stringify(venue), { headers: this.headers })
        ).then(data => {
                data.subscribe(response => {
                    this.getVenueList();
                });
            });
    }

    putVenue(venue: VenueModel) {
        console.log(venue.name);
        console.log('put Venue:' + this.urlService.apiUrl() + '/Venues');
        Promise.resolve(
            this.http.put(this.urlService.apiUrl() + '/Venues', JSON.stringify(venue), { headers: this.headers })
        ).then(data => {
                data.subscribe(response => {
                    this.getVenueList();
                });
            });
    }

    deleteVenue(venueId: Number) {
        Promise.resolve(
            this.http.delete(this.urlService.apiUrl() + '/Venues/' + venueId)
        ).then(data => {
                data.subscribe(response => {
                    this.getVenueList();
                });
            });
    }

    getTechnicalDifficultyList() {
        Promise.resolve(
            this.http.get(this.urlService.apiUrl() + '/TechnicalDifficulties')
        ).then(data => data.subscribe(
            technicalDifficultyData => {
                this.technicalDifficultyList.next(technicalDifficultyData.json());
            }
        ));
    }

    getGenderList() {
        Promise.resolve(
            this.http.get(this.urlService.apiUrl() + '/Genders')
        ).then(data => data.subscribe(
            genderData => {
                this.genderList.next(genderData.json());
            }
        ));
    }
}
