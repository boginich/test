import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';

export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercept request', req);

    // const newReq = req.clone({ body: null }); // clear the body
    // return next.handle(newReq);
    return next.handle(req);
    /*const cloned = req.clone({
      headers: req.headers.append('Auth', 'TOKEN')
    });

    return next.handle(cloned).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('Interceptor response', event);
        }
      })
    );*/
  }
}
