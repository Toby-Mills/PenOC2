import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CompetitorModel } from '../models/competitor.model';
import { ApiService } from '../services/api.service';

@Injectable()
export class CompetitorService {
    public allCompetitors: BehaviorSubject<CompetitorModel[]> = new BehaviorSubject<CompetitorModel[]>(null);

    constructor(private apiService: ApiService) {
        this.getAllCompetitors();
    }

    getCompetitor(competitorId?: Number, name?: String) {
        let  url = '/Competitors?';
        if (competitorId != null) { url += 'idCompetitor=' + competitorId; }
        if (name != null) { url += '&name=' + name; }

        return Promise.resolve(
            this.apiService.get(url)
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
        let url = '/Competitors/Individuals?';
        if (name != null) { url += '&name=' + name; }

        return Promise.resolve(
            this.apiService.get(url)
        );
    }

    putCompetitor(competitor: CompetitorModel) {
        return this.apiService.put('/Competitors/', JSON.stringify(competitor));
    }

    postCompetitor(competitor: CompetitorModel): Observable<Response> {
        return this.apiService.post('/Competitors/', JSON.stringify(competitor));
    }

    deleteCompetitor(competitorId: Number): Observable<Response> {
        return this.apiService.delete('/Competitors/' + competitorId);
    }

    mergeCompetitors(competitorId: Number, mergeTargetId: Number): Observable<Response> {
        return this.apiService.put('/Competitors/' + competitorId + '/merge/' + mergeTargetId, undefined);
    }
}
