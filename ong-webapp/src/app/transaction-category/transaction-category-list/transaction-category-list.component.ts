import { Page } from '../../core/pagination/page';
import { ApiService } from '../../api/api.service';
import { TransactionCategory } from './../transaction-category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-category-list',
  templateUrl: './transaction-category-list.component.html',
  styleUrls: ['./transaction-category-list.component.css']
})
export class TransactionCategoryListComponent implements OnInit {
  transactionsCategories: TransactionCategory[] = null;
  page: Page = null;

  constructor(private apiSerive: ApiService) {}

  ngOnInit() {
    this.apiSerive
      .get('listTransactionCategory')
      .toPromise()
      .then(resp => {
        const response = resp.json();
        this.transactionsCategories = response.results as TransactionCategory[];
        this.page = response.page as Page;
      });
  }
}
