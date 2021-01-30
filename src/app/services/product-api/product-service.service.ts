import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  public product = null;

  constructor(private http: HttpClient) {
  }

  getProducts(size: number, pageIndex: number): Observable<any> {
    return this.http.get('http://localhost:8083/products?size=' + size + '&page=' + pageIndex);
  }

  getProductsByName(name: string): Observable<any> {
    return this.http.get('http://localhost:8083/products/search/findAllByNameContains?name=' + name);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete('http://localhost:8083/products/' + id);
  }

  addProduct(productName: string, productPrice: number): Observable<any> {
    return this.http.post('http://localhost:8083/products', {
      name: productName,
      price: productPrice
    });
  }

  modifyProduct(productName: string, productPrice: number, productId: number): Observable<any> {
    return this.http.put('http://localhost:8083/products/' + productId, {
      name: productName,
      price: productPrice
    });
  }
}
