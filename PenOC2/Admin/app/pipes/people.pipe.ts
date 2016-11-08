import { Pipe, PipeTransform } from '@angular/core';
import { CompetitorModel } from '../models/competitor.model';

//---------------------------------------------------------------------------------------
@Pipe({ name: 'people' })
export class PeoplePipe implements PipeTransform {
  transform(allCompetitors: CompetitorModel[], peopleOnly: boolean) {
    return allCompetitors.filter(competitor => {
      if (peopleOnly) {
        return (competitor.genderId < 3 && competitor.genderId > 0)
      } else {
        return true
      }
    });
  }
}