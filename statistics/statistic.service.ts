import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {IDefaultResponse, IStatistic} from "./statistic.api";
import {mockData} from "./mock-data";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor() { }

  getStatistic(params?: any): Observable<IDefaultResponse<IStatistic>> {
    return of(mockData);
  }
}
