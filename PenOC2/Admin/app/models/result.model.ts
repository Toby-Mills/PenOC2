export class ResultModel {
    oeventId: number;
    courseId: number;
    course: string;
    competitorId: number;
    competitor: string;
    position: number;
    time: string;
    points: number;
    disqualified: boolean;
    comment: string;

    constructor(){
        this.points = 0;
    }
}
