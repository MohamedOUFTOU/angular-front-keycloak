import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/Product';
import {ProductServiceService} from '../../services/product-api/product-service.service';
import {ProductItem} from '../../models/ProductItem';
import {Costumer} from '../../models/Costumer';
import {CostumerService} from '../../services/costumer-api/costumer.service';
import {BillService} from '../../services/bill-api/bill.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent implements OnInit {

  // Products Table variables
  products: Product[] = [];
  productsLoaded = false;
  productsPageIndex = 0;
  elementsSize = 2;
  productsTotalPages = -1;
  productsPageIndexes: any;

  productsItems: ProductItem[] = [];
  totalBill = 0;

  // Costumers Table Variables
  costumers: Costumer[] = [];
  costumersLoaded = false;
  costumersPageIndex = 0;
  costumersTotalPages = -1;
  costumersPageIndexes: any;

  selectedCostumer: Costumer | undefined;

  constructor(private productService: ProductServiceService, private costumerService: CostumerService, private billService: BillService, private router: Router) {
  }

  ngOnInit(): void {
    this.productService.getProducts(this.elementsSize, this.productsPageIndex)
      .subscribe(data => {
        console.log(data);
        // this.products.push(...data._embedded.products);
        this.products = data._embedded.products;
        this.productsTotalPages = data.page.totalPages;
        this.productsPageIndex = data.page.number;
        this.productsPageIndexes = new Array(this.productsTotalPages);
        console.log(this.products);
        this.productsLoaded = true;
      }, error => {
        console.error(error);
      });

    this.costumerService.getCostumers(this.elementsSize, this.costumersPageIndex)
      .subscribe(data => {
        console.log(data);
        this.costumers = data._embedded.costumers;
        this.costumersTotalPages = data.page.totalPages;
        this.costumersPageIndex = data.page.number;
        this.costumersPageIndexes = new Array(this.costumersTotalPages);
        this.costumersLoaded = true;

      }, error => {
        console.error(error);
      });
  }

  onChangeProductPage(i: number): void {
    this.productsPageIndex = i;
    this.productService.getProducts(this.elementsSize, this.productsPageIndex)
      .subscribe(data => {
        console.log(data);
        // this.products.push(...data._embedded.products);
        this.products = data._embedded.products;
        this.productsTotalPages = data.page.totalPages;
        this.productsPageIndex = data.page.number;
        this.productsPageIndexes = new Array(this.productsTotalPages);
        console.log(this.products);
        this.productsLoaded = true;
      }, error => {
        console.error(error);
      });
  }

  onProductSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.productService.getProductsByName(value)
      .subscribe(data => {
        console.log(data);
        // this.products.push(...data._embedded.products);
        this.products = data._embedded.products;
        this.productsTotalPages = data.page.totalPages;
        this.productsPageIndex = data.page.number;
        this.productsPageIndexes = new Array(this.productsTotalPages);
        console.log(this.products);
        this.productsLoaded = true;
      }, error => {
        console.error(error);
      });
  }

  calculateTotalBill(): number {
    let total = 0;
    this.productsItems.forEach(pi => {
      total += pi.price;
    });
    return total;
  }

  productExistes(p: Product): boolean {
    let exist = false;
    this.productsItems.forEach((pi) => {
      if (pi.product.id === p.id) {
        exist = true;
        return;
      }
    });
    return exist;
  }

  onAddProduct(p: Product): void {
    if (!this.productExistes(p)) {
      this.productsItems.push({
        product: p,
        quantity: 1,
        price: p.price,
        productID: p.id,
        id: -1,
        bill: undefined
      });
      this.totalBill = this.calculateTotalBill();
    }

  }

  onChangeQte(event: Event, pi: ProductItem): void {
    const qte: number = +((event.target as HTMLInputElement).value);
    pi.quantity = qte;
    pi.price = pi.product.price * pi.quantity;
    this.totalBill = this.calculateTotalBill();
  }

  onDeleteProductItem(pi: ProductItem): void {
    this.productsItems = this.productsItems.filter(item => item !== pi);
    this.totalBill = this.calculateTotalBill();
  }

  onCostumerSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.costumerService.getCostumersByName(value)
      .subscribe(data => {
        console.log(data);
        // this.products.push(...data._embedded.products);
        this.costumers = data._embedded.costumers;
        this.costumersTotalPages = data.page.totalPages;
        this.costumersPageIndex = data.page.number;
        this.costumersPageIndexes = new Array(this.costumersTotalPages);
        console.log(this.costumers);
        this.costumersLoaded = true;
      }, error => {
        console.error(error);
      });
  }

  onChangeCostumerPage(i: number): void {
    this.costumersPageIndex = i;
    this.costumerService.getCostumers(this.elementsSize, this.costumersPageIndex)
      .subscribe(data => {
        console.log(data);
        // this.products.push(...data._embedded.products);
        this.costumers = data._embedded.costumers;
        this.costumersTotalPages = data.page.totalPages;
        this.costumersPageIndex = data.page.number;
        this.costumersPageIndexes = new Array(this.costumersTotalPages);
        console.log(this.costumers);
        this.costumersLoaded = true;
      }, error => {
        console.error(error);
      });
  }

  onSelectCostumer(c: Costumer): void {
    console.log('Selected Costumer : ', c);
    this.selectedCostumer = c;
  }

  onAddBill(): void {
    if (this.productsItems.length > 0 && this.selectedCostumer !== undefined) {
      console.log(this.productsItems, this.selectedCostumer);
      this.billService.addBill(this.selectedCostumer)
        .subscribe(data => {
          console.log(data);
          this.productsItems.forEach(pi => {
            pi.bill = 'http://localhost:8084/bills/' + data.id;
            this.billService.addProductItem(pi)
              .subscribe(res => {
                console.log(res);
              }, error => {
                console.error(error);
              });
            this.router.navigate(['/bills-list']);
          });

        }, error => {
          console.error(error);
        });
    }

  }
}
