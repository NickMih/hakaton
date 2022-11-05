import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FlexModule} from "@angular/flex-layout";
import {AppRouterModule} from "./app-routiing.module";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {AppService} from "./app.service";
import {appServiceFactory} from "./app.data";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FlexModule,
    AppRouterModule,
    RouterModule
  ],
  providers: [
    AppService,
    {provide: APP_INITIALIZER, useFactory: appServiceFactory, deps: [AppService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
