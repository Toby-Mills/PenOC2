import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './components/app/app.component';
import { ButtonBarComponent } from './components/button-bar/button-bar.component';
import { CompetitorComponent } from './components/competitor/competitor.component';
import { OEventComponent } from './components/oevent/oevent.component';
import { OEventListComponent } from './components/oevent-list/oevent-list.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseComponent } from './components/course/course.component';
import { ResultListComponent } from './components/result-list/result-list.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsItemComponent } from './components/newsItem/newsItem.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { LookupEditorComponent } from './components/lookup-editor/lookup-editor.component';

import { ResultTimePipe } from './pipes/result-time.pipe';
import { DateStringPipe } from './pipes/date-string.pipe';
import { MatchingCompetitorsPipe } from './pipes/matching-competitors.pipe';
import { PeoplePipe } from './pipes/people.pipe';

import { CourseService } from './services/course.service';
import { LookupService } from './services/lookup.service';
import { CompetitorService } from './services/competitor.service';
import { OEventService } from './services/oevent.service';
import { ResultService } from './services/result.service';
import { NewsService } from './services/news.service';
import { UrlService } from './services/url.service';
import { UploadService } from './services/upload.service';

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
      { path: 'news/new', component: NewsItemComponent },
      { path: 'lookups', component: LookupEditorComponent }
    ])],       // module dependencies
  declarations: [AppComponent,
    CompetitorComponent,
    ButtonBarComponent,
    OEventComponent,
    OEventListComponent,
    CourseListComponent,
    CourseComponent,
    ResultListComponent,
    NewsListComponent,
    NewsItemComponent,
    FileUploadComponent,
    LookupEditorComponent,
    DateStringPipe,
    ResultTimePipe,
    PeoplePipe,
    MatchingCompetitorsPipe],
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

