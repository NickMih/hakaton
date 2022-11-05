import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IToken, IUser} from "./auth.api";
import {Observable, switchMap, tap} from "rxjs";
import {API, SECTION, TOKEN} from "../services/ApiSettings";
import jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";

export const AUTH_CHANNEL = 'authChannel';
type AuthEvent = | 'login' | 'logout';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private zone: NgZone
  ) {
    const bc = new BroadcastChannel(AUTH_CHANNEL);

    bc.addEventListener('message', (event: any) => this.completeEvent(event));
  }

  completeEvent(event: AuthEvent): void {
    switch (event) {
      case 'logout':
        this.zone.run(() => this._logout());
    }
  }

  registration(user: IUser): Observable<IToken> {
    return this.http.post<IToken>(`${API}/${SECTION}/register/`, user)
      .pipe(
        switchMap(() => this.login(user))
      );
  }

  login(user: IUser): Observable<IToken> {
    return this.http.post<IToken>(`${API}/${TOKEN}/login/`, user)
      .pipe(
        tap((token) => this.completeLogin(token.auth_token))
      );
  }

  private _logout(): void {
    localStorage.clear();
    this.user = null;
    this.router.navigate(['login']).then();
  }

  completeLogin(token: string): void {
    localStorage.setItem('authorization', `${token}`);
    this.user = this.getDecodedAccessToken(token);
    const bc = new BroadcastChannel(AUTH_CHANNEL);
    bc.postMessage('login');
  }

  getDecodedAccessToken(token: string): any {
    // в этом месте должен быть JSon Web Token,
    // но это кастомная авторизация джанго, поэтому здесь только 3-я его часть.
    console.log(token);
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
