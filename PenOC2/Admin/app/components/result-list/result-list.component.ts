import { Component, Input, forwardRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ResultService } from '../../services/result.service';
import { CourseModel } from '../../models/course.model';
import { ResultModel } from '../../models/result.model';
import { CompetitorModel } from '../../models/competitor.model';
import { LookupService } from '../../services/lookup.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CompetitorComponent } from '../competitor/competitor.component';

@Component({
    moduleId: module.id,
    selector: 'result-list',
    templateUrl: './result-list.template.html',
    styleUrls: ['./result-list.style.css'],
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ResultListComponent),
      multi: true
    }
  ]
})
export class ResultListComponent implements ControlValueAccessor {
    @Input() course: CourseModel;
    @ViewChildren(CompetitorComponent) competitorSelectors: QueryList<CompetitorComponent>;
    public clubList: Array<any>;
    private resultList: ResultModel[];
    private propagateChange = (_: any) => {};

    constructor(private resultService: ResultService, private lookupService: LookupService) {
    }

    // *** Control Value Accessor *************************************

    public writeValue(value: ResultModel[]) {
        if (value !== undefined) {
            this.resultList = value;
        }
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched() {

    }
    // *****************************************************************

    ngOnInit() {
        this.lookupService.clubList.subscribe(clubData => this.clubList = clubData);
    }

    ngAfterViewInit() {
        this.competitorSelectors.changes.subscribe(queryList => {
            let competitorSeletor: CompetitorComponent = this.competitorSelectors.last;
            if (competitorSeletor !== undefined) {
                competitorSeletor.delayedActivateSearch(true);
            }
        });
    }

    public renumberPostitions() {
        this.resultList.map(function (result, index) { result.position = index + 1; });
        this.propagateChange(this.resultList);
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
        let newTimeString: string;

        if (!isNaN(Number(timeString))) {
            if (timeString.length < 6) {
                timeString = new Array(6 - timeString.length + 1).join('0') + timeString;
            }
            newTimeString = timeString.substr(4, 2); // seconds
            newTimeString = timeString.substr(2, 2) + ':' + newTimeString; // minutes
            newTimeString = timeString.substr(0, 2) + ':' + newTimeString; // hours

            this.resultList[index].time = newTimeString;
            this.propagateChange(this.resultList);
        }
    }

    public deleteClicked(event: any, position: number) {
        this.deleteResult(position);
    }

    private deleteResult(position: number) {
        this.resultList.splice(
            this.resultList.findIndex(result => result.position === position), 1
        );
        this.renumberPostitions();
    }

    private sortByTime() {
        this.resultList.sort(function(result1, result2) {
            if (result1.disqualified) {return 1; }
            if (result2.disqualified) {return -1; }
            if (result1.time > result2.time) {return 1; }
            if (result1.time < result2.time) {return -1; }
            if (result1.time = result2.time) {return 0; }
        });
        this.renumberPostitions();
    }
}
