import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {FlexModule} from "@angular/flex-layout";
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    RouterModule.forChild([{path: '', component: MainComponent}]),
    MatCardModule
  ]
})
export class MainModule { }
