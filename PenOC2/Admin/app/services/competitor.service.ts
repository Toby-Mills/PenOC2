import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CompetitorModel } from '../models/competitor.model';
import { ApiService } from '../services/api.service';

@Injectable()
export class CompetitorService {
    public allCompetitors: BehaviorSubject<CompetitorModel[]> = new BehaviorSubject<CompetitorModel[]>(null);

    constructor(private http: Http, private apiService: ApiService) {
        this.getAllCompetitors();
    }

    getCompetitor(competitorId?: Number, name?: String) {
        let  url = this.apiService.apiUrl() + '/Competitors?';
        if (competitorId != null) { url += 'idCompetitor=' + competitorId; }
        if (name != null) { url += '&name=' + name; }

        return Promise.resolve(
            this.http.get(url, {headers: this.apiService.apiHeaders()})
        );
    }

    getAllCompetitors(): void {
        this.getCompetitor().then(data => data.subscribe(
            competitorData => {
                let competitors: Array<CompetitorModel>;
                competitors = competitorData.json();
                competitors.sort((a, b) => {
                    if (a.genderId === 3 && b.genderId !== 3) {return 1; }
                    if (a.genderId !== 3 && b.genderId === 3) {return -1; }
                    if (a.fullName.toLowerCase() < b.fullName.toLowerCase()) {return -1; }
                    if (a.fullName.toLowerCase() === b.fullName.toLowerCase()) {return 0; }
                    if (a.fullName.toLowerCase() > b.fullName.toLowerCase()) {return 1; }
                });
                this.allCompetitors.next(competitors);
            }
        ));
    }

    getIndividual(name?: String) {
        let url = this.apiService.apiUrl() + '/Competitors/Individuals?';
        if (name != null) { url += '&name=' + name; }

        return Promise.resolve(
            this.http.get(url, {headers: this.apiService.apiHeaders()})
        );
    }

    putCompetitor(competitor: CompetitorModel) {
        let obs = this.http.put(
            this.apiService.apiUrl() + '/Competitors/',
            JSON.stringify(competitor),
            { headers: this.apiService.apiHeaders() }
        );
        return obs;
    }

    postCompetitor(competitor: CompetitorModel): Observable<Response> {
        let obs = this.http.post(
            this.apiService.apiUrl() + '/Competitors/',
            JSON.stringify(competitor),
            { headers: this.apiService.apiHeaders() }
        );
        return obs;
    }

    deleteCompetitor(competitorId: Number): Observable<Response> {
        let obs = this.http.delete(
            this.apiService.apiUrl() + '/Competitors/' + competitorId,
            { headers: this.apiService.apiHeaders() }
        );
        return obs;
    }

    mergeCompetitors(competitorId: Number, mergeTargetId: Number): Observable<Response>{
        let obs = this.http.put(
            this.apiService.apiUrl() + '/Competitors/' + competitorId + '/merge/' + mergeTargetId,
             undefined,
             { headers: this.apiService.apiHeaders() }
        );
        return obs;
    }
}
