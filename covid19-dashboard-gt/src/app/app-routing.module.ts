import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportCasesComponent } from './report-cases/report-cases.component';
import { NewCasesComponent } from './new-cases/new-cases.component';



const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'report-cases', component: ReportCasesComponent
  },
  {
    path: 'new-cases', component: NewCasesComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
