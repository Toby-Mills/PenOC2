import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UrlService } from '../services/url.service';

@Injectable()
export class LookupService {
    public genderList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
    public technicalDifficultyList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
    public clubList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
    public venueList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);

    constructor(private http: Http, private urlService:UrlService) {

        this.getGenderList();
        this.getTechnicalDifficultyList();
        this.getClubList();
        this.getVenueList();

    }
    
    getVenueList(){
        Promise.resolve(
            this.http.get(this.urlService.apiUrl() +'/Venues')
        ).then(data => data.subscribe(
            venueData => {
                this.venueList.next(venueData.json());
            }
        ))
    }
        
    getClubList(){
        Promise.resolve(
            this.http.get(this.urlService.apiUrl() +'/Clubs')
        ).then(data => data.subscribe(
            clubData => {
                this.clubList.next(clubData.json());
            }
        ))
    }
    
    getTechnicalDifficultyList(){
        Promise.resolve(
            this.http.get(this.urlService.apiUrl() +'/TechnicalDifficulties')
        ).then(data => data.subscribe(
            technicalDifficultyData => {
                this.technicalDifficultyList.next(technicalDifficultyData.json());
            }
        ))
    }

    getGenderList(){
        Promise.resolve(
            this.http.get(this.urlService.apiUrl() +'/Genders')
        ).then(data => data.subscribe(
            genderData => {
                this.genderList.next(genderData.json());
            }
        ))
    }
}