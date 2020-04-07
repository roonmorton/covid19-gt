import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiCharts } from '../helpers/api-charts';
import { Departament } from '../models/Departament';

@Injectable({
  providedIn: 'root'
})
export class DepartamentService {

  private api: ApiCharts = new ApiCharts();

  constructor(private http: HttpClient) { }

  getDepartament(): Observable<Array<Departament>> {
    return this.http.get<any>(this.api.getDepartament());
  }
}
