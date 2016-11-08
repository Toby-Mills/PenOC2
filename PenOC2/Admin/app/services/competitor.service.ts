import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CompetitorModel } from '../models/competitor.model';
import { UrlService } from '../services/url.service';

@Injectable()
export class CompetitorService {
    private headers: Headers;
    public allCompetitors: BehaviorSubject<CompetitorModel[]> = new BehaviorSubject<CompetitorModel[]>(null);

    constructor(private http: Http, private urlService:UrlService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.getAllCompetitors();
    }

    getCompetitor(competitorId?: Number, name?: String) {
        var url = this.urlService.apiUrl() + '/Competitors?';
        if (competitorId != null) { url += 'idCompetitor=' + competitorId }
        if (name != null) { url += '&name=' + name }

        return Promise.resolve(
            this.http.get(url)
        )
    }

    getAllCompetitors(): void {
        this.getCompetitor().then(data => data.subscribe(
            competitorData => {
                this.allCompetitors.next(competitorData.json());
            }
        ))
    }

    getIndividual(name?: String) {
        var url = this.urlService.apiUrl() + '/Competitors/Individuals?';
        if (name != null) { url += '&name=' + name }

        return Promise.resolve(
            this.http.get(url)
        )
    }

    putCompetitor(competitor: CompetitorModel) {
        return Promise.resolve(
            this.http.put(this.urlService.apiUrl()+ '/Competitors/', JSON.stringify(competitor), { headers: this.headers })
        )
    }

    postCompetitor(competitor: CompetitorModel):Observable<Response> {
        var obs = this.http.post(this.urlService.apiUrl() + '/Competitors/', JSON.stringify(competitor), { headers: this.headers });
        this.getAllCompetitors();
        return obs;
    }
}