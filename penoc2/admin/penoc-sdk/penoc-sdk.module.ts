import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from './services/api.service';
import { CompetitorService } from './services/competitor.service';
import { CourseService } from './services/course.service';
import { LookupService } from './services/lookup.service';
import { NewsService } from './services/news.service';
import { OEventService } from './services/oevent.service';
import { ResultService } from './services/result.service';
import { UploadService } from './services/upload.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ ],
  providers: [ ],
  exports: [ ]
})
export class PenocSdkModule {
     static forRoot(): ModuleWithProviders {
    return {
      ngModule: PenocSdkModule,
      providers: [ApiService,
        CompetitorService,
        CourseService,
        LookupService,
        NewsService,
        OEventService,
        ResultService,
        UploadService]
    };
  }
}
