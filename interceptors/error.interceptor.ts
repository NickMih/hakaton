import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError(error => this._showErrorMessage(error)),
      );
  }

  private _showErrorMessage(errorResponse: HttpErrorResponse): Observable<never> {
    errorResponse.error?.detail ? this.toastrService.error(errorResponse.error.detail) : this._defaultMessage(errorResponse);

    return throwError(errorResponse);
  }

  private handleBlobResponse (errorRes: HttpErrorResponse, options) {
    return new Promise<any>((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = (e: Event) => {
        try {
          const options = {enableHtml: true, timeOut: 10000, tapToDismiss: false};
          this.toastrService
            .error(this._prepareErrorMessage(JSON.parse((<any>e.target).result), errorRes.status, errorRes.statusText), '', options);
        } catch (e) {
          reject(errorRes);
        }
      };
      reader.onerror = (e) => {
        reject(errorRes);
      };
      reader.readAsText(errorRes.error);
    });
  }

  private _prepareErrorMessage(error: any, errorStatus: number, errorStatusText: string): string {
    const status = `<b>Статус:</b> <i>${errorStatus}</i><br>`;
    const statusText = `<b>Сообщение:</b> <i>${errorStatusText}</i><br>`;
    let body = '';

    if (typeof error === 'object') {
      Object.keys(error).forEach(key => {
        const message: string = Array.isArray(error[key]) ? error[key].join(', ') : error[key];
        body += `<b>${key}:</b> <i>${message}</i><br>`;
      });
    }

    return `${status}${statusText}${body}`;
  }

  private _defaultMessage(errorResponse: HttpErrorResponse) {
    switch (errorResponse.status) {
      case 401:
        break;
      case 403:
        this.toastrService.error('У вас недостаточно прав, чтобы выполнить данное действие');
        break;
      case 503:
        this.toastrService.info('На сервере ведутся технические работы. Попробуйте позднее.');
        break;
      default:
        const options = {enableHtml: true, timeOut: 10000, tapToDismiss: false};
        if (errorResponse instanceof HttpErrorResponse && errorResponse.error instanceof Blob && errorResponse.error.type === "application/json") {
          this.handleBlobResponse(errorResponse, options);
        } else {
          this.toastrService
            .error(this._prepareErrorMessage(errorResponse.error, errorResponse.status, errorResponse.statusText), '', options);
        }
    }
  }
}
