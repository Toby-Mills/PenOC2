import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ResultModel } from '../models/result.model';
import { UrlService } from '../services/url.service';

@Injectable()
export class ResultService {
    private headers: Headers;
    
    constructor(private http: Http, private urlService:UrlService) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
     }
    
    getCourseResults(idCourse: Number){
        return Promise.resolve(
            this.http.get(this.urlService.apiUrl() +'/Courses/' + idCourse + '/Results')
        )
    }

    putResult(result: ResultModel){
        return Promise.resolve(
           this.http.put(this.urlService.apiUrl() +'/Results/',JSON.stringify(result), { headers: this.headers })
        )
    }

    postResult(result: ResultModel) {
        return Promise.resolve(
            this.http.post(this.urlService.apiUrl() +'/Results/', JSON.stringify(result), { headers: this.headers })
        )
    }

    putCourseResults(courseId: number, results: ResultModel[]) {
        return Promise.resolve(
            this.http.put(this.urlService.apiUrl() +'/Courses/' + courseId + '/Results', JSON.stringify(results), { headers: this.headers })
        )
    }
}