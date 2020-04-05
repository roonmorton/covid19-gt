import { Injectable } from '@angular/core';
import { ApiCharts } from '../helpers/api-charts';
import { HttpClient } from '@angular/common/http';
import { Gender } from '../models/Gender';
import { Observable } from 'rxjs';
import { Status } from '../models/Status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private api: ApiCharts = new ApiCharts();

  constructor(private http: HttpClient) { }

  getStatus(): Observable<Array<Status>> {
    return this.http.get<any>(this.api.getStatus());
  }
}
