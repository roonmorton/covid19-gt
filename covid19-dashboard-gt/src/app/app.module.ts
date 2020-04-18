import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleChartsModule } from 'angular-google-charts';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import 'hammerjs';

import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NavComponent } from './example/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportCasesComponent } from './report-cases/report-cases.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { NewCaseComponent } from './new-cases/new-case.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import { AccumulatedCasesComponent } from './charts/accumulated-cases/accumulated-cases.component';
import { AccumulatedCasesPerDayComponent } from './charts/accumulated-cases-per-day/accumulated-cases-per-day.component';
import { CasesByAgeComponent } from './charts/cases-by-age/cases-by-age.component';
import { CasesByGenderComponent } from './charts/cases-by-gender/cases-by-gender.component';
import { CasesByLocationComponent } from './charts/cases-by-location/cases-by-location.component';
import { SummaryOfCasesComponent } from './charts/summary-of-cases/summary-of-cases.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    ReportCasesComponent,
    NewCaseComponent,
    AccumulatedCasesComponent,
    AccumulatedCasesPerDayComponent,
    CasesByAgeComponent,
    CasesByGenderComponent,
    CasesByLocationComponent,
    SummaryOfCasesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GoogleChartsModule.forRoot('AIzaSyBR0p3IoSPMay6usT8AE3pILZ5A-MtyLKA'),
    MatToolbarModule,
    HttpClientModule,
    MatProgressBarModule,
    MatCardModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatChipsModule
  ],
  providers: [
    MatNativeDateModule  ,
    MatDatepickerModule,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: APP_BASE_HREF, useValue : '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
