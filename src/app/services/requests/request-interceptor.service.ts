import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KeycloakSecService} from '../keycloak-service/keycloak-sec.service';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {

  constructor(private secService: KeycloakSecService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('[INFO] Request interceptor starting.......');
    if (!this.secService.kc?.authenticated) {
      return next.handle(req);
    }
    const request = req.clone(
      {
        setHeaders: {
          Authorization: 'Bearer ' + this.secService.kc?.token
        }
      }
    );
    return next.handle(request);
  }


}
