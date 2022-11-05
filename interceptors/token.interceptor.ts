import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modified = this.setTokenHeader(request);

    return next.handle(modified);
  }

  protected setTokenHeader(request: HttpRequest<any>): HttpRequest<any> {
    const authorizationToken: string = localStorage.getItem('authorization')!;

    if (authorizationToken) {
      return request.clone({
        setHeaders: {
          Authorization: authorizationToken
        }
      });
    }

    return request;
  }
}
