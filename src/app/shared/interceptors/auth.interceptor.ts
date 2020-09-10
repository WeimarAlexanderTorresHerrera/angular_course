import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('auth');
    
    /*
    if(token) {
      request = request.clone({
        url: request.url + '?auth=' + token,
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      })
    }
    */
    
    if(token) {
      request = request.clone({
        url: request.url.indexOf('?') > -1 ? request.url + '&auth=' + token : request.url + '?auth=' + token
      })
    }
    
    return next.handle(request);
  }

}