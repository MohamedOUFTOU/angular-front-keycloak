import {Component, OnInit} from '@angular/core';
import {Product} from '../models/Product';
import {ProductServiceService} from '../services/product-api/product-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  loaded = false;
  pageIndex = 0;
  elementSize = 10;
  totalPages = -1;
  pageIndexes: any;

  constructor(private productService: ProductServiceService, private router: Router) {
  }

  ngOnInit(): void {
    this.productService.getProducts(this.elementSize, this.pageIndex)
      .subscribe(data => {
        console.log(data);
        // this.products.push(...data._embedded.products);
        this.products = data._embedded.products;
        this.totalPages = data.page.totalPages;
        this.pageIndex = data.page.number;
        this.pageIndexes = new Array(this.totalPages);
        console.log(this.products);
        this.loaded = true;
      }, error => {
        console.error(error);
      });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure that you want to delete the product with the ID: ' + id + ' ?')) {
      this.productService.deleteProduct(id)
        .subscribe(data => {
          console.log(data);
          window.location.reload();
        }, error => {
          console.error(error);
        });
    }
  }

  onEdit(p: Product): void {
    this.productService.product = (p as any);
    this.router.navigate(['/add-product']);
  }

  onChangePage(i: number): void {
    this.pageIndex = i;
    this.productService.getProducts(this.elementSize, this.pageIndex)
      .subscribe(data => {
        console.log(data);
        // this.products.push(...data._embedded.products);
        this.products = data._embedded.products;
        this.totalPages = data.page.totalPages;
        this.pageIndex = data.page.number;
        this.pageIndexes = new Array(this.totalPages);
        console.log(this.products);
        this.loaded = true;
      }, error => {
        console.error(error);
      });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.productService.getProductsByName(value)
      .subscribe(data => {
        console.log(data);
        // this.products.push(...data._embedded.products);
        this.products = data._embedded.products;
        this.totalPages = data.page.totalPages;
        this.pageIndex = data.page.number;
        this.pageIndexes = new Array(this.totalPages);
        console.log(this.products);
        this.loaded = true;
      }, error => {
        console.error(error);
      });
  }
}
