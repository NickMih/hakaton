import {Injectable} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {HttpClient} from '@angular/common/http';
import {filter, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {AuthService} from "./login/auth.service";
import {Router, RouterModule} from "@angular/router";


@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router
  ) {
  }

  initializeApp(): Promise<any> {
    return of(localStorage.getItem('authorization'))
      .pipe(
        filter(res => !!res),
        switchMap(result => this.authService.user = result),
        tap(() => this.router.navigate(['statistic'])),
        untilDestroyed(this)
      )
      .toPromise()
      .catch(() => Promise.resolve(null));
  }
}
