import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ResultService } from '../../services/result.service';
import { CourseModel } from '../../models/course.model';
import { ResultModel } from '../../models/result.model';
import { CompetitorModel } from '../../models/competitor.model';
import { CompetitorService } from '../../services/competitor.service';
import { LookupService } from '../../services/lookup.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'result-list',
    templateUrl: './app/components/resultList/resultList.template.html',
    styleUrls: ['./app/components/resultList/resultList.style.css'],
    providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ResultListComponent),
      multi: true
    }
  ]
})
export class ResultListComponent implements ControlValueAccessor {
    private resultList: ResultModel[];
    private propagateChange = (_: any) => {};
public test: string;

    @Input() course: CourseModel;

    public clubList: Array<any>;

    public writeValue(value: ResultModel[]) {
        if (value !== undefined) {
            this.resultList = value;
        }
    }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

    constructor(private resultService: ResultService, private lookupService: LookupService) {
    }

    ngOnInit() {
        this.lookupService.clubList.subscribe(clubData => this.clubList = clubData);
    }

    public renumberPostitions() {
        this.resultList.map(function (result, index) { result.position = index + 1 })
    }

    public newResult(event: Event) {
        this.resultList.push(new ResultModel);
        this.resultList[this.resultList.length - 1].position = this.resultList.length;
        this.propagateChange(this.resultList);
    }

    public setCompetitor(index: number, competitor: CompetitorModel) {
        if (competitor) {
            this.resultList[index].competitorId = competitor.id;
            this.resultList[index].competitor = competitor.fullName;
        } else {
            this.resultList[index].competitorId = null;
            this.resultList[index].competitor = null;
        }
        this.propagateChange(this.resultList);
    }

    public correctTime(index: number, timeString: string) {
        var newTimeString: string;

        if (!isNaN(Number(timeString))) {
            if (timeString.length < 6) {
                timeString = new Array(6 - timeString.length + 1).join('0') + timeString;
            }
            newTimeString = timeString.substr(4, 2); //seconds
            newTimeString = timeString.substr(2, 2) + ':' + newTimeString; //minutes
            newTimeString = timeString.substr(0, 2) + ':' + newTimeString; //hours

            this.resultList[index].time = newTimeString;
            this.propagateChange(this.resultList);
        }
    }

    public deleteResult(position: number) {
        this.resultList.splice(
            this.resultList.findIndex(result => result.position == position), 1
        )
        this.renumberPostitions();
        this.propagateChange(this.resultList);
    }
}