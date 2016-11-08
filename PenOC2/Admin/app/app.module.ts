import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { ButtonBarComponent } from './components/buttonBar/buttonBar.component';
import { CompetitorComponent } from './components/competitor/competitor.component';
import { OEventComponent } from "./components/oevent/oevent.component";
import { OEventListComponent } from "./components/oeventList/oeventList.component";
import { CourseListComponent } from "./components/courseList/courseList.component";
import { CourseComponent } from "./components/course/course.component";
import { ResultListComponent } from "./components/resultList/resultList.component";
import { NewsListComponent } from "./components/newsList/newsList.component";
import { NewsItemComponent } from "./components/newsItem/newsItem.component";
import { FileUploadComponent } from './components/fileUpload/fileUpload.component';

import { resultTime } from './pipes/resultTime.pipe';
import { DateString } from './pipes/dateString.pipe';

import { CourseService } from './services/course.service';
import { LookupService } from './services/lookup.service';
import { CompetitorService } from './services/competitor.service';
import { OEventService } from './services/oevent.service';
import { ResultService } from './services/result.service';
import { NewsService } from './services/news.service';
import { UrlService } from './services/url.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { UploadService } from './services/upload.service';

import { MatchingCompetitorsPipe } from './pipes/matchingCompetitors.pipe';
import { PeoplePipe } from './pipes/people.pipe';

@NgModule({
  imports: [BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/events', pathMatch: 'full' },
      { path: 'events', component: OEventListComponent },
      { path: 'events/:eventId', component: OEventComponent },
      { path: 'events/:eventId/courses', component: CourseListComponent },
      { path: 'events/:eventId/courses/:courseId', component: CourseComponent },
      { path: 'events/:eventId/courses/new', component: CourseComponent },
      { path: 'news', component: NewsListComponent },
      { path: 'news/:id', component: NewsItemComponent },
      { path: 'news/new', component: NewsItemComponent }
    ])],       // module dependencies
  declarations: [AppComponent,
    CompetitorComponent,
    ButtonBarComponent,
    OEventComponent,
    OEventListComponent,
    CourseListComponent,
    CourseComponent,
    ResultListComponent,
    DateString,
    resultTime,
    NewsListComponent,
    NewsItemComponent,
    PeoplePipe,
    MatchingCompetitorsPipe,
    FileUploadComponent],   // components and directives
  bootstrap: [AppComponent],     // root component
  providers: [OEventService,
    CourseService,
    LookupService,
    CompetitorService,
    ResultService,
    NewsService,
    UrlService,
    UploadService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}] // services
})
export class AppModule { }

