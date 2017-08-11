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
    validTime: boolean;

    constructor(){
        this.points = 0;
        this.validTime = true;
    }
}
