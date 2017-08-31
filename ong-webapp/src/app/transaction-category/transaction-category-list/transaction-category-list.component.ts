import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
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
  queryParamsSubscription: Subscription = null;

  constructor(private apiSerive: ApiService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.apiSerive
        .queryParams(params)
        .get('listTransactionCategory')
        .toPromise()
        .then(resp => {
          const response = resp.json();
          this.transactionsCategories = response.results as TransactionCategory[];
          this.page = response.page as Page;
        });
    });
  }
}
