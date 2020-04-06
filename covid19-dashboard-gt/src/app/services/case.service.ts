import { Injectable } from '@angular/core';
import { ApiCharts } from '../helpers/api-charts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from '../models/Status';
import { Case } from '../models/Case';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  private api: ApiCharts = new ApiCharts();

  constructor(private http: HttpClient) { }

  getCases(): Observable<any> {
    return this.http.get<any>(this.api.getCases());
  }

  saveCase(params: Case): Observable<any> {
    if (params.idCase){
      return this.http.put<any>(this.api.saveCase(), params);
    }else
      return this.http.post<any>(this.api.saveCase(), params);
  }

  getCase(paramId: string): Observable<any> {
    return this.http.get<any>(this.api.getCase(paramId));
  }
}
