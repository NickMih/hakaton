import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SimpleTableComponent} from './simple-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormatDateTimeModule} from '../../pipes/format-date-time';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';
import {FlexModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {SimpleValuePipe} from './simple-table.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SimpleFunctionValuePipe } from './simple-function-value.pipe';



@NgModule({
  declarations: [SimpleTableComponent, SimpleValuePipe, SimpleFunctionValuePipe],
    imports: [
        CommonModule,
        MatTableModule,
        MatCheckboxModule,
        FormatDateTimeModule,
        MatPaginatorModule,
        MatButtonModule,
        MatTooltipModule,
        MatSortModule,
        FlexModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
  exports: [SimpleTableComponent]
})
export class SimpleTableModule { }
