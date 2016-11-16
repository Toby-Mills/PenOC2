import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { CourseModel } from '../models/course.model';
import { UrlService } from '../services/url.service';

@Injectable()
export class CourseService {
    private headers: Headers;
    
    constructor(private http: Http, private urlService:UrlService) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
     }
    
    getCourse(idCourse: Number){
        return Promise.resolve(
            this.http.get(this.urlService.apiUrl() +'/Courses/' + idCourse) 
        )
    }
    
    getEventCourses(idOEvent: Number){
        return Promise.resolve(
            this.http.get(this.urlService.apiUrl() +'/Oevents/' + idOEvent + '/Courses')
        )
    }
    
    putCourse(course: CourseModel){
        return Promise.resolve(
           this.http.put(this.urlService.apiUrl() +'/Courses/',JSON.stringify(course), { headers: this.headers })
        )
    }

    postCourse(course: CourseModel) {
        return Promise.resolve(
            this.http.post(this.urlService.apiUrl() +'/Courses/', JSON.stringify(course), { headers: this.headers })
        )
    }

    deleteCourse(courseId: Number){
        return Promise.resolve(
            this.http.delete(this.urlService.apiUrl() +'/Courses/' + courseId)
        )
    }
}