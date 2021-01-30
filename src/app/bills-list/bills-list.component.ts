import {Component, OnInit} from '@angular/core';
import {BillService} from '../services/bill-api/bill.service';
import {Bill} from '../models/Bill';

@Component({
  selector: 'app-bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.css']
})
export class BillsListComponent implements OnInit {

  bills: Bill[] = [];
  loaded = false;
  pageIndex = 0;
  elementsSize = 2;
  totalPages = -1;
  pageIndexes: any;

  constructor(private billService: BillService) {
  }

  ngOnInit(): void {
    this.billService.getBills(this.elementsSize, this.pageIndex)
      .subscribe(data => {
        this.bills = data.content;
        this.totalPages = data.totalPages;
        this.pageIndex = data.pageable.pageNumber;
        this.pageIndexes = new Array(this.totalPages);
        this.loaded = true;
        console.log(data);
      }, error => {
        console.error(error);
      });
  }

  onChangePage(i: number): void {
    this.pageIndex = i;
    this.billService.getBills(this.elementsSize, this.pageIndex)
      .subscribe(data => {
        this.bills = data.content;
        this.totalPages = data.totalPages;
        this.pageIndex = data.pageable.pageNumber;
        this.pageIndexes = new Array(this.totalPages);
        this.loaded = true;
      }, error => {
        console.error(error);
      });
  }
}
