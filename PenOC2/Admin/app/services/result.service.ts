import { Injectable } from '@angular/core';
import { ResultModel } from '../models/result.model';
import { ApiService } from '../services/api.service';

@Injectable()
export class ResultService {

    constructor(private apiService: ApiService) {
     }

    getCourseResults(idCourse: Number){
        return Promise.resolve(
            this.apiService.get('/Courses/' + idCourse + '/Results')
        );
    }

    putResult(result: ResultModel){
        return Promise.resolve(
           this.apiService.put('/Results/',JSON.stringify(result))
        );
    }

    postResult(result: ResultModel) {
        return Promise.resolve(
            this.apiService.post('/Results/', JSON.stringify(result))
        );
    }

    putCourseResults(courseId: number, results: ResultModel[]) {
        return Promise.resolve(
            this.apiService.put( '/Courses/' + courseId + '/Results', JSON.stringify(results))
        );
    }
}
