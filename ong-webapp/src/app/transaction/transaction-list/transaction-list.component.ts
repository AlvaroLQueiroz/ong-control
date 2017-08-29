import { Wallet } from './../../wallet/wallet';
import { Transaction } from '../transaction';
import { TransactionService } from './../../api/transaction.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  @Input()  walletId: number = null;
  @Input()  categoryId: number = null;
  @Input() sizes: string = 's12';
  transactions: Transaction[] = null;

  constructor(
    private transactionService: TransactionService,
  ) { }

  ngOnInit() {
    if(this.walletId){
      this.transactionService.listWalletTransactions(this.walletId).then(transactions => {
        this.transactions = transactions;
      })
    }
    else if(this.categoryId){
      this.transactionService.listCategoryTransactions(this.categoryId).then(transactions => {
        this.transactions = transactions;
      })
    }else{
      this.transactionService.listTransactions().then(transactions => {
        this.transactions = transactions;
      })
    }
  }

}
