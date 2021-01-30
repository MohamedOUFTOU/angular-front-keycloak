import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsListComponent} from './products-list/products-list.component';
import {CostumersListComponent} from './costumers-list/costumers-list.component';
import {BillsListComponent} from './bills-list/bills-list.component';
import {AddProductComponent} from './products-list/add-product/add-product.component';
import {AddCostumerComponent} from './costumers-list/add-costumer/add-costumer.component';
import {AddBillComponent} from './bills-list/add-bill/add-bill.component';

const routes: Routes = [
  {
    path: 'products-list',
    component: ProductsListComponent
  },
  {
    path: 'costumers-list',
    component: CostumersListComponent
  },
  {
    path: 'bills-list',
    component: BillsListComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
  {
    path: 'add-costumer',
    component: AddCostumerComponent
  },
  {
    path: 'add-bill',
    component: AddBillComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
