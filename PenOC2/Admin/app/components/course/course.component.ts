import { Component, ViewChild } from '@angular/core';
import { CourseModel } from '../../models/course.model';
import { ResultModel } from '../../models/result.model';
import { CourseService } from '../../services/course.service';
import { ResultService } from '../../services/result.service';
import { LookupService } from '../../services/lookup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ResultListComponent } from '../resultList/resultList.component';

@Component({
    selector: 'course',
    templateUrl: './app/components/course/course.template.html',
    styleUrls: ['./app/components/course/course.style.css']
})
export class CourseComponent {
    public course: CourseModel;
    public resultList: ResultModel[];
    public technicalDifficultyList: Array<Object>;
    @ViewChild('results') results: ResultListComponent;

    constructor(private courseService: CourseService, private resultService: ResultService, private lookupService: LookupService, private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.lookupService.technicalDifficultyList.subscribe(data => this.technicalDifficultyList = data)

        this.route.params.forEach((params: Params) => {
            this.loadCourse();
        })
    }

    private loadCourse() {
        var courseId: number;
        var eventId: number;

        this.route.params.forEach((params: Params) => {
            courseId = + params['courseId'];
            eventId = + params['eventId'];

        })
        if (courseId > 0) {
            this.courseService.getCourse(courseId).then((response) => {
                response.subscribe((courseData) => {
                    this.course = courseData.json()[0];
                })
            })

            this.resultService.getCourseResults(courseId).then((response) => {
                response.subscribe((resultsData) => {
                    this.resultList = resultsData.json();
                    this.resultList.forEach(
                        function (result, resultIndex) {
                            result.time = new Date(result.time).toISOString().substring(11, 19);
                        }
                    )
                })
            })
        } else {
            this.course = new CourseModel();
            this.course.eventId = eventId;
            this.resultList = new Array<ResultModel>();
        }
    }

    public saveCourse(): void {
        this.courseService.putCourse(this.course)
            .then(data => {
                data.subscribe(
                    courseData => {
                        this.loadCourse();
                    }
                )
            });

        this.saveResults();
    }

    public createCourse(): void {
        this.courseService.postCourse(this.course)
            .then(data => {
                data.subscribe(courseData => {
                    this.course.id = courseData.json().id;
                    this.saveResults()
                    this.loadCourse();
                });

            });
    }

    public upsertCourse(): void {
        if (this.course.id > 0) {
            this.saveCourse();
        } else {
            this.createCourse();
        }
    }

    public cancelClicked() {
        this.loadCourse();
    }

    private saveResults() {
        this.resultList.map(result => result.courseId = this.course.id);
        this.resultService.putCourseResults(this.course.id, this.resultList)
            .then(
            data => data.subscribe(data => { })
            )
    }
}