import {Component, OnInit} from '@angular/core';
import {Costumer} from '../models/Costumer';
import {CostumerService} from '../services/costumer-api/costumer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-costumers-list',
  templateUrl: './costumers-list.component.html',
  styleUrls: ['./costumers-list.component.css']
})
export class CostumersListComponent implements OnInit {

  costumers: Costumer[] = [];
  loaded = false;
  pageIndex = 0;
  elemntsSize = 5;
  totalPages = -1;
  pageIndexes: any;

  constructor(private costumerService: CostumerService, private router: Router) {
  }

  ngOnInit(): void {
    this.costumerService.getCostumers(this.elemntsSize, this.pageIndex)
      .subscribe(data => {
        console.log(data);
        this.costumers = data._embedded.costumers;
        this.totalPages = data.page.totalPages;
        this.pageIndex = data.page.number;
        this.pageIndexes = new Array(this.totalPages);
        this.loaded = true;

      }, error => {
        console.error(error);
      });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.costumerService.getCostumersByName(value)
      .subscribe(data => {
        console.log(data);
        // this.products.push(...data._embedded.products);
        this.costumers = data._embedded.costumers;
        this.totalPages = data.page.totalPages;
        this.pageIndex = data.page.number;
        this.pageIndexes = new Array(this.totalPages);
        console.log(this.costumers);
        this.loaded = true;
      }, error => {
        console.error(error);
      });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure that you want to delete the costumer with the ID: ' + id + ' ?')) {
      this.costumerService.deleteCostumer(id)
        .subscribe(data => {
          console.log(data);
          window.location.reload();
        }, error => {
          console.error(error);
        });
    }
  }

  onEdit(c: Costumer): void {
    this.costumerService.costumer = (c as any);
    this.router.navigate(['/add-costumer']);
  }

  onChangePage(i: number): void {
    this.pageIndex = i;
    this.costumerService.getCostumers(this.elemntsSize, this.pageIndex)
      .subscribe(data => {
        console.log(data);
        // this.products.push(...data._embedded.products);
        this.costumers = data._embedded.costumers;
        this.totalPages = data.page.totalPages;
        this.pageIndex = data.page.number;
        this.pageIndexes = new Array(this.totalPages);
        console.log(this.costumers);
        this.loaded = true;
      }, error => {
        console.error(error);
      });
  }
}
