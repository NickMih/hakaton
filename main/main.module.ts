import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {FlexModule} from "@angular/flex-layout";
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {LoginModule} from "../login/login.module";
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    RouterModule.forChild([{path: '', component: MainComponent}]),
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class MainModule { }
