import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
  HttpEventType
} from '@angular/common/http';

import { tap, map, retry, catchError } from 'rxjs/operators';
import { Observable, pipe, throwError, of } from 'rxjs';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotifyService } from '../../common/notification/services/notify.service';
import { BASE_API_URL } from 'src/app/common/constants';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(public toaster: ToastrService, private notifyService: NotifyService, private router:Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = null;

    if (request.url == BASE_API_URL + 'api/user/login') {
      headers = new HttpHeaders({
        "Content-Type": "application/json;charset=UTF-8",
      });
    } else {
      let token = sessionStorage.getItem('token');
      if(!token){
        this.router.navigateByUrl('/');
        this.toaster.error('Not authenticated user');
      }
      headers = new HttpHeaders({
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": sessionStorage.getItem('token'),
      });
    }

    const clone = request.clone({
      headers: headers
    });
    return next.handle(clone).pipe(
      retry(3),
      tap(evt => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.success)
            this.toaster.success(evt.body.success.message, evt.body.success.title, { positionClass: 'toast-top-right' });
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            this.toaster.error(err.error.details[0].message, 'Incorrect data', { positionClass: 'toast-top-right' });
          } catch (e) {
            this.toaster.error('An error occurred', '', { positionClass: 'toast-top-right' });
          }
          //log error 
        } else if (err instanceof ErrorEvent) {
          try {
            this.toaster.error(err.error.message, 'Client-side error', { positionClass: 'toast-top-right' });
          } catch (e) {
            this.toaster.error('Unknown error occurred', '', { positionClass: 'toast-top-right' });
          }
        }
        return of(err);
      }))
  }

}

