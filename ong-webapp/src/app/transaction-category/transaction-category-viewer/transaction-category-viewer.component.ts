import { TransactionService } from './../../api/transaction.service';
import { TransactionCategoryService } from './../../api/transaction-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionCategory } from './../transaction-category';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transaction-category-viewer',
  templateUrl: './transaction-category-viewer.component.html',
  styleUrls: ['./transaction-category-viewer.component.css']
})
export class TransactionCategoryViewerComponent implements OnInit {

  transactionCategory: TransactionCategory = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private transactionCategoryService: TransactionCategoryService,
    private transactionService: TransactionService,
  ) { }

  ngOnInit() {
    let transactionCategoryId = this.route.snapshot.params['id'];
    if (transactionCategoryId){
      this.transactionCategoryService.getTransactionCategory(transactionCategoryId).then(transactionCategory => {
        this.transactionCategory = transactionCategory;
        this.loading = false;
      })
    }
  }

}
