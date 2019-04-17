import { Component } from '@angular/core';
import { OEventService } from '../../../penoc-sdk/services/oevent.service';
import { CourseService } from '../../../penoc-sdk/services/course.service';
import { OEventModel } from '../../../penoc-sdk/models/oevent.model';
import { CourseModel } from '../../../penoc-sdk/models/course.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'course-list',
    templateUrl: './course-list.template.html'
})
export class CourseListComponent {
    oevent: OEventModel;
    courseList: CourseModel[];

    constructor(private oeventService: OEventService, private courseService: CourseService, 
        private router: Router, private route: ActivatedRoute) {
     }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = + params['eventId'];
            if (id > 0) {
                this.courseService.getEventCourses(id).then((data) => {
                    data.subscribe((courseData) => {
                        this.courseList = courseData.json();
                    })
                })
                this.oeventService.getOEvent(id).then((data) => {
                    data.subscribe((eventData) => {
                        this.oevent = eventData.json()[0];
                    })
                })
            } else {
                this.oevent = null;
                this.courseList = null;
            }
        })
    }

    public courseClicked(courseId: number) {
        this.router.navigate(["/events", this.oevent.id, "courses", courseId])
    }

    public newClicked() {
        this.router.navigate(["/events", this.oevent.id, "courses", "new"])
    }

    public backClicked() {
        this.router.navigate(["/events", this.oevent.id]);
    }

    public deleteCourse(event: Event, courseId: number) {
        event.stopPropagation();
        this.courseService.deleteCourse(courseId).then((result) => {
            result.subscribe((data) => {
                let newCourseList = this.courseList.filter(function(course: CourseModel, index: number, array: CourseModel[]): boolean {return(course.id != courseId)})
                this.courseList = newCourseList;
            })
        })
    }
}
