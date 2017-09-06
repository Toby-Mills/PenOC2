import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LookupService } from '../../../penoc-sdk/services/lookup.service';
import { CompetitorService } from '../../../penoc-sdk/services/competitor.service';
import { CompetitorModel } from '../../../penoc-sdk/models/competitor.model';

@Component({
    moduleId: module.id,
    selector: 'competitor-editor',
    templateUrl: './competitor-editor.template.html',
    styleUrls: ['./competitor-editor.style.css']
})
export class CompetitorEditorComponent {
    @Input() competitor: CompetitorModel;
    @Output() saved = new EventEmitter();
    @Output() cancelled= new EventEmitter();
    public mergeTarget: CompetitorModel;
    public genderList: Array<Object>;
    public mode: String = 'edit';
    public mergeStyle: String = '';

    public constructor(public competitorService: CompetitorService, private lookupService: LookupService){

    }

    ngOnInit() {
        this.lookupService.genderList.subscribe(data => this.genderList = data);
    }

    public saveClicked() {
        if (this.competitor.id > 0) {
            this.competitorService.putCompetitor(this.competitor)
            .subscribe(data => {
                this.competitor = data.json()[0];
                this.competitorService.getAllCompetitors();
                this.saved.emit(this.competitor);
            });
        } else {
            this.competitorService.postCompetitor(this.competitor)
            .subscribe(data => {
                this.competitor = data.json()[0];
                this.competitorService.getAllCompetitors();
                this.saved.emit(this.competitor);
            });
        }
    }

    public modalClicked(event: MouseEvent) {
        if (event.srcElement.id === 'divModalBackground') {
            this.cancel();
        };
    }

    public cancelClicked() {
        this.cancel();
    }

    private cancel() {
        this.cancelled.emit();
    }

    public mergeModeClicked (event: MouseEvent) {
        event.preventDefault();
        this.mode = 'merge';
    }

    public mergeClicked() {
        let primary: number;
        let secondary: number;

        if (this.mergeTarget.id > 0) {
            if (this.mergeStyle = 'primary') {
                primary = this.mergeTarget.id;
                secondary = this.competitor.id;

            } else {
                primary = this.competitor.id;
                secondary = this.mergeTarget.id;
            }

            this.competitorService.mergeCompetitors(primary, secondary)
            .subscribe(data => {
                this.mode = 'edit';
                this.competitor = undefined;
                this.mergeStyle = '';
                this.competitorService.getAllCompetitors();
            });
        }
    }

    public mergeTargetKeyPressed(mergeTargetId: number) {
        this.mergeTarget = undefined;
        if (mergeTargetId > 0) {
            this.competitorService.getCompetitor(mergeTargetId).then(res => {
                res.subscribe(data => {
                    this.mergeTarget = data.json()[0];
                });
            });
        }
    }
}
