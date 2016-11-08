import { Pipe, PipeTransform } from '@angular/core';
import { CompetitorModel } from '../models/competitor.model';

//---------------------------------------------------------------------------------------
@Pipe({ name: 'matchingCompetitors' })
export class MatchingCompetitorsPipe implements PipeTransform {
  transform(allCompetitors: CompetitorModel[], searchString) {
    return allCompetitors.filter(competitor => {return new RegExp(searchString.toLowerCase()).test(competitor.fullName.toLowerCase())});
  }
}