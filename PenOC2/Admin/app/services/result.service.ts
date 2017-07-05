import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ResultModel } from '../models/result.model';
import { ApiService } from '../services/api.service';

@Injectable()
export class ResultService {
    private headers: Headers;

    constructor(private http: Http, private apiService: ApiService) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
     }

    getCourseResults(idCourse: Number){
        return Promise.resolve(
            this.http.get(this.apiService.apiUrl() + '/Courses/' + idCourse + '/Results')
        );
    }

    putResult(result: ResultModel){
        return Promise.resolve(
           this.http.put(this.apiService.apiUrl() + '/Results/',JSON.stringify(result), { headers: this.headers })
        );
    }

    postResult(result: ResultModel) {
        return Promise.resolve(
            this.http.post(this.apiService.apiUrl() + '/Results/', JSON.stringify(result), { headers: this.headers })
        );
    }

    putCourseResults(courseId: number, results: ResultModel[]) {
        return Promise.resolve(
            this.http.put(this.apiService.apiUrl() + '/Courses/' + courseId + '/Results', JSON.stringify(results), { headers: this.headers })
        );
    }
}
