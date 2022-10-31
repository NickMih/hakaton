import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {MainComponent} from "./main/main.component";

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: AppComponent,
        children: [
          {
            path: '',
            loadChildren: () => import('./main/main.module')
              .then(m => m.MainModule)
          }
        ]
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module')
          .then(m => m.LoginModule)
      },
    ])
  ]
})
export class AppRouterModule {

}
