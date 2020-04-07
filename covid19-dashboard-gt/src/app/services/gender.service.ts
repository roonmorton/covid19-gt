import { Injectable } from '@angular/core';
import { ApiCharts } from '../helpers/api-charts';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Gender } from '../models/Gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private api: ApiCharts = new ApiCharts();

  constructor(private http: HttpClient) { }

  getGender(): Observable<Array<Gender>> {
    return this.http.get<any>(this.api.getGender());
  }
}
