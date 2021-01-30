import {Component, OnInit} from '@angular/core';
import {KeycloakSecService} from './services/keycloak-service/keycloak-sec.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-front-keycloak';
  userName: string;

  ngOnInit(): void {
  }

  constructor(public securityService: KeycloakSecService) {
    this.userName = (securityService.kc?.tokenParsed as any)?.name;
  }

  onLogin(): void {
    this.securityService.kc?.login();
  }

  onLogout(): void {
    this.securityService.kc?.logout();
  }

  onChangePassword(): void {
    this.securityService.kc?.accountManagement();
  }

  cheakRole(role: string): boolean{
    return true;
  }
}
