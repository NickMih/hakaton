import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AuthService, VersionData } from './auth';


@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  initializeApp(): Promise<VersionData | null> {
    return this.getCurrentVersion()
      .pipe(
        switchMap(result => this.getCurrentUser(result)),
        untilDestroyed(this)
      )
      .toPromise()
      .catch(() => Promise.resolve(null));
  }

  getCurrentVersion(): Observable<string> {
    return this.http
      .get<VersionData>(`common/api/version/edition/`)
      .pipe(map(response => response.edition));
  }

  getCurrentUser(edition: string): Observable<VersionData> {
    if (edition === 'special' || edition === 'common' && localStorage.getItem('authorization')) {
      return this.authService.getProfile();
    }

    return of(null);
  }
}
