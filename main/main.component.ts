import {Component, Inject} from '@angular/core';
import {AuthService} from "../login/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @Inject(AuthService) auth: AuthService;

  // должнен быть UserApi, но у нас юзера вообще нет
  get user(): any {
    return this.auth.user;
  }
}
