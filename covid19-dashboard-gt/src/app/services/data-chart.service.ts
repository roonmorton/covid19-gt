import { Injectable } from '@angular/core';
import { ApiCharts } from '../helpers/api-charts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataChartService {
  

  private api: ApiCharts = new ApiCharts();
  
  constructor(private http: HttpClient) { }
  
  getDataGeo(): Observable<any> {
    return this.http.get<any>(this.api.getDataGeo());
  }


  getReportCases(): Observable<any>{
    return this.http.get<any>(this.api.getReportCases());
  }

  getCasesByGender(): Observable<any>{
    return this.http.get<any>(this.api.getCasesByGender());
  }

  getAccumulatedCases(): Observable<any>{
    return this.http.get<any>(this.api.getAccumulatedCases());
  }
 
  
  getAgeCases(): Observable<any>{
    return this.http.get<any>(this.api.getAgeCases());
  }
}

