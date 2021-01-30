import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostumerService {

  public costumer = null;

  constructor(private http: HttpClient) {
  }

  getCostumers(size: number, pageIndex: number): Observable<any> {
    return this.http.get('http://localhost:8082/costumers?size=' + size + '&page=' + pageIndex);
  }

  getCostumersByName(name: string): Observable<any> {
    return this.http.get('http://localhost:8082/costumers/search/findAllByNameContains?name=' + name);
  }

  deleteCostumer(id: number): Observable<any> {
    return this.http.delete('http://localhost:8082/costumers/' + id);
  }

  addCostumer(costumerName: string, costumerEmail: string): Observable<any> {
    return this.http.post('http://localhost:8082/costumers', {
      name: costumerName,
      email: costumerEmail
    });
  }

  modifyCostumer(costumerName: string, costumerEmail: string, costumerId: number): Observable<any> {
    return this.http.put('http://localhost:8082/costumers/' + costumerId, {
      name: costumerName,
      email: costumerEmail
    });
  }
}
