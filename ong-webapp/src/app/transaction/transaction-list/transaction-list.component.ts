import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Transaction } from './../transaction';
import { Response } from '@angular/http';
import { ApiService } from '../../api/api.service';
import { Page } from '../../core/pagination/page';
import { Wallet } from './../../wallet/wallet';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit, OnDestroy {
  @Input() categoryId: number = null;
  @Input() sizes: string = 's12';
  @Input() walletId: number = null;
  page_number: number = 1;
  page: Page = null;
  queryParamsSubscription: Subscription;
  transactions: Transaction[] = null;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    let request;
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.page_number = params['page'] || 1;
      request = this.apiService.queryParams({ page: this.page_number });
      if (this.walletId) {
        request = request.params(this.walletId).get('listWalletTransactions');
      } else if (this.categoryId) {
        request = request.params(this.categoryId).get('listCategoryTransactions');
      } else {
        request = request.get('listTransactions');
      }
      request.toPromise().then(resp => {
        const response = resp.json();
        this.transactions = response.results as Transaction[];
        this.page = response.page as Page;
      });
    });
  }
  export_csv(){
    var params = {}
    if (this.categoryId){
      params['category_id'] = this.categoryId;
    }
    if (this.walletId){
      params['wallet_id'] = this.walletId;
    }
    this.apiService.queryParams(params).get('exportTransactions').toPromise().then(resp => {
      var a = document.createElement('a');
      var blob = new Blob([resp.text()], {type: resp.headers.get('content-type')});
      var url = window.URL.createObjectURL(blob);
      var now = new Date();
      a.href = url;
      a.download = `Transações-${now.getDay()}-${now.getMonth()}-${now.getFullYear()}.csv`
      a.click();
      window.URL.revokeObjectURL(url);
    })
  }
  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
  }
}
