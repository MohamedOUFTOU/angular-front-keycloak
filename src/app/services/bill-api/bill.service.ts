import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Costumer} from '../../models/Costumer';
import {ProductItem} from '../../models/ProductItem';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) {
  }

  getBills(size: number, pageIndex: number): Observable<any> {
    return this.http.get('http://localhost:8084/bills/full?size=' + size + '&page=' + pageIndex);
  }

  getFullBill(id: number): Observable<any>{
    return this.http.get('http://localhost:8084/bills/full/' + id);
  }

  addBill(c: Costumer): Observable<any> {
    return this.http.post('http://localhost:8084/bills', {
      billingDate: new Date(),
      costumerID: c.id
    });
  }

  addProductItem(pi: ProductItem): Observable<any> {
    return this.http.post('http://localhost:8084/productItems', pi);
  }
}
