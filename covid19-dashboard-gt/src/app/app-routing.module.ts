import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportCasesComponent } from './report-cases/report-cases.component';
import { NewCaseComponent } from './new-cases/new-case.component';



const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'report-cases', component: ReportCasesComponent
  },
  {
    path: 'new-case', component: NewCaseComponent
  },
  {
    path: 'new-case/:id', component: NewCaseComponent
  },
  {
    path: '**', component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
