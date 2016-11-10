import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
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
        console.log('post');
        return Promise.resolve(
            this.http.post(this.urlService.apiUrl() + '/Clubs', JSON.stringify(club), { headers: this.headers })
        )
    }

    putClub(club: ClubModel) {
        console.log('put');
        return Promise.resolve(
            this.http.put(this.urlService.apiUrl() + '/Clubs', JSON.stringify(club), { headers: this.headers })
        )
    }

    deleteClub(clubId: Number){
        return Promise.resolve(
            this.http.delete(this.urlService.apiUrl() +'/Clubs/' + clubId)
        )
    }

    postVenue(venue: VenueModel) {
        console.log('post');
        return Promise.resolve(
            this.http.post(this.urlService.apiUrl() + '/Venues', JSON.stringify(venue), { headers: this.headers })
        )
    }

    putVenue(venue: VenueModel) {
        console.log('put');
        return Promise.resolve(
            this.http.put(this.urlService.apiUrl() + '/Venues', JSON.stringify(venue), { headers: this.headers })
        )
    }

    deleteVenue(venueId: Number){
        return Promise.resolve(
            this.http.delete(this.urlService.apiUrl() +'/Venues/' + venueId)
        )
    }

    getTechnicalDifficultyList() {
        Promise.resolve(
            this.http.get(this.urlService.apiUrl() + '/TechnicalDifficulties')
        ).then(data => data.subscribe(
            technicalDifficultyData => {
                this.technicalDifficultyList.next(technicalDifficultyData.json());
            }
        ))
    }

    getGenderList() {
        Promise.resolve(
            this.http.get(this.urlService.apiUrl() + '/Genders')
        ).then(data => data.subscribe(
            genderData => {
                this.genderList.next(genderData.json());
            }
        ))
    }
}