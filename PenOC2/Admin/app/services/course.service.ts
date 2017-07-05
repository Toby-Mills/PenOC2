import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { CourseModel } from '../models/course.model';
import { ApiService } from '../services/api.service';

@Injectable()
export class CourseService {


    constructor( private apiService: ApiService) {
     }

    getCourse(idCourse: Number) {
        return Promise.resolve(
            this.apiService.get('/Courses/' + idCourse)
        );
    }

    getEventCourses(idOEvent: Number) {
        return Promise.resolve(
            this.apiService.get('/Oevents/' + idOEvent + '/Courses')
        );
    }

    putCourse(course: CourseModel) {
        return Promise.resolve(
           this.apiService.put('/Courses/', JSON.stringify(course))
        );
    }

    postCourse(course: CourseModel) {
        return Promise.resolve(
            this.apiService.post('/Courses/', JSON.stringify(course))
        );
    }

    deleteCourse(courseId: Number) {
        return Promise.resolve(
            this.apiService.delete('/Courses/' + courseId)
        );
    }
}
