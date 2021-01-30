import {BrowserModule} from '@angular/platform-browser';
import {ApplicationRef, DoBootstrap, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductsListComponent} from './products-list/products-list.component';
import {CostumersListComponent} from './costumers-list/costumers-list.component';
import {BillsListComponent} from './bills-list/bills-list.component';
import {KeycloakSecService} from './services/keycloak-service/keycloak-sec.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RequestInterceptorService} from './services/requests/request-interceptor.service';
import { AddProductComponent } from './products-list/add-product/add-product.component';
import {FormsModule} from '@angular/forms';
import { AddCostumerComponent } from './costumers-list/add-costumer/add-costumer.component';
import { AddBillComponent } from './bills-list/add-bill/add-bill.component';


const keySec: KeycloakSecService = new KeycloakSecService();

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    CostumersListComponent,
    BillsListComponent,
    AddProductComponent,
    AddCostumerComponent,
    AddBillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: KeycloakSecService,
      useValue: keySec
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    }
  ],
  /*
  bootstrap: [AppComponent]
   */
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef): void {
    keySec.init()
      .then(authenticated => {
        console.log(authenticated);
        appRef.bootstrap(AppComponent);
      })
      .catch(err => {
        console.error(err);
      });
  }
}
