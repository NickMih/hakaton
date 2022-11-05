import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import {FlexModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {SimpleTableModule} from "../common/components/simple-table/simple-table.module";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { FiltersComponent } from './filters/filters.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [
    StatisticsComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: StatisticsComponent}]),
    FlexModule,
    MatCardModule,
    MatTableModule,
    SimpleTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class StatisticsModule { }
