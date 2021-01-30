import {Component, OnInit} from '@angular/core';
import {ProductServiceService} from '../../services/product-api/product-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productName = '';
  productPrice = 0;
  isEditing = false;

  constructor(private productService: ProductServiceService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.productService.product != null) {
      console.log(this.productService.product);
      this.productName = (this.productService.product as any).name;
      this.productPrice = (this.productService.product as any).price;
      this.isEditing = true;
    }
  }

  onAddProduct(): void {
    if (this.productName.length > 3 && this.productPrice > 10) {

      this.productService.addProduct(this.productName, this.productPrice)
        .subscribe(data => {
          // console.log(data);
          this.router.navigate(['/products-list']);
        }, error => {
          console.error(error);
        });
    } else {
      alert('Please fill all the inputs in the form with valid entries !!!');
    }

  }

  onModifyProduct(): void {

    if (this.productName.length > 3 && this.productPrice > 10) {
      const productId: number = (this.productService.product as any).id;
      console.log(productId);
      this.productService.modifyProduct(this.productName, this.productPrice, productId)
        .subscribe(data => {
          console.log(data);
          this.productService.product = null;
          this.router.navigate(['/products-list']);
        }, error => {
          console.error(error);
        });
    } else {
      alert('Please fill all the inputs in the form with valid entries !!!');
    }
  }
}
