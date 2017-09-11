import { ApiService } from '../../api/api.service';
import { MaterializeAction } from 'angular2-materialize';
import { TransactionCategory } from './../../transaction-category/transaction-category';
import { Wallet } from './../../wallet/wallet';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../transaction';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

import * as moment from 'moment';

@Component({
  selector: 'app-transaction-editor',
  templateUrl: './transaction-editor.component.html',
  styleUrls: ['./transaction-editor.component.css']
})
export class TransactionEditorComponent implements OnInit {
  transaction: Transaction = null;
  loading: boolean = true;

  wallets: Wallet[] = null;
  categories: TransactionCategory[] = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private apiService: ApiService
  ) {
    this.transaction = new Transaction();
    this.transaction.category = new TransactionCategory();
    this.transaction.wallet = new Wallet();
    this.transaction.active = true;
  }

  ngOnInit() {
    const transactionId = this.route.snapshot.params['id'];
    if (transactionId) {
      this.apiService
        .params(transactionId)
        .get('getTransaction')
        .toPromise()
        .then(resp => {
          this.transaction = resp.json() as Transaction;
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
    this.apiService
      .queryParams({ page_size: 0 })
      .get('listWallets')
      .toPromise()
      .then(resp => {
        this.wallets = resp.json().results as Wallet[];
      });
    this.apiService
      .queryParams({ page_size: 0 })
      .get('listTransactionCategory')
      .toPromise()
      .then(resp => {
        this.categories = resp.json().results as TransactionCategory[];
      });
  }

  submit() {
    let request;
    this.transaction.due_date = moment(this.transaction.due_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    if (this.transaction.id) {
      request = this.apiService
        .data(this.transaction)
        .put('updateTransaction')
        .toPromise();
    } else {
      request = this.apiService
        .data(this.transaction)
        .post('createTransaction')
        .toPromise();
    }

    request
      .then(transaction => {
        this.router.navigate(['/transactions']);
      })
      .catch(err => console.log(err));
  }

  cancel() {
    this.location.back();
  }
}
