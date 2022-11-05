import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {StatisticService} from "./statistic.service";
import {Observable} from "rxjs";
import {IStatistic} from "./statistic.api";
import {setPaginatorParams} from "../common/utils";
import {DefaultParams, PaginatorOption} from "../common/default-models";
import {StatisticTable} from "./statistic.data";
import {MatDialog} from "@angular/material/dialog";
import {FiltersComponent} from "./filters/filters.component";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  data$: Observable<IStatistic[]>;
  params = new DefaultParams('id', new PaginatorOption());
  tableColumns = StatisticTable;
  constructor(
    private statisticsService: StatisticService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.get();
  }

  private _get(): Observable<IStatistic[]> {
    return this.statisticsService.getStatistic()
      .pipe(
        setPaginatorParams(this.params)
      );
  }

  get(): void {
    this.data$ = this._get();
  }


  openFilters(): void {
    this.dialog.open(FiltersComponent, {
      width: '50vw'
    })
      .afterClosed()
      .pipe(
        untilDestroyed(this)
      )
      .subscribe()
  }
}
