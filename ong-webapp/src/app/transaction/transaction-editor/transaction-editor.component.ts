import { MaterializeAction } from 'angular2-materialize';
import { TransactionCategoryService } from './../../api/transaction-category.service';
import { WalletService } from './../../api/wallet.service';
import { TransactionCategory } from './../../transaction-category/transaction-category';
import { Wallet } from './../../wallet/wallet';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from './../../api/transaction.service';
import { Transaction } from '../transaction';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

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
    private transactionService: TransactionService,
    private walletService: WalletService,
    private transactionCategoryService: TransactionCategoryService
  ) {
    this.transaction = new Transaction();
    this.transaction.active = true;
  }

  ngOnInit() {
    console.log('ola')
    let transactionId = this.route.snapshot.params['id'];
    if(transactionId){
      this.transactionService.getTransaction(transactionId).then(transaction => {
        this.transaction = transaction;
        this.loading = false;
      });
    }else{
      this.loading = false;
    }
    this.walletService.getWallets().then(wallets => {
      this.wallets = wallets;
    });
    this.transactionCategoryService.listTransactionCategory().then(categories => {
      this.categories = categories;
    });
  }

  submit(){
    console.log(this.transaction)
    this.transactionService.setTransaction(this.transaction)
    .then(transaction => {
      this.router.navigate(['/transactions'])
    }).catch(err => console.log(err))
  }

  cancel(){
    this.location.back();
  }

}
