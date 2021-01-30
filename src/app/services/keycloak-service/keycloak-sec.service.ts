import {Injectable} from '@angular/core';
import {KeycloakInstance} from 'keycloak-js';

declare var keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakSecService {

  public kc: KeycloakInstance | undefined;

  constructor() {
  }

  async init(): Promise<void> {
    console.log('[INFO] Keycloak security initialisation...');
    return new Promise(
      (resolve, reject) => {
        // @ts-ignore
        this.kc = new Keycloak({
          url: 'http://localhost:8080/auth/',
          realm: 'e-com',
          clientId: 'angular-front'
        });
        this.kc?.init({
          // onLoad: 'login-required'
          onLoad: 'check-sso'
        })
          .then((authenticated) => {
            // @ts-ignore
            return resolve(authenticated);
          })
          .catch(err => {
            reject(err);
          });
      }
    );
    console.log(this.kc?.token);
  }

}
