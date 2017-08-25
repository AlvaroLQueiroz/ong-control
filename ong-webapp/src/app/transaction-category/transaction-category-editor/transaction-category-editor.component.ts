import { TransactionCategoryService } from './../../api/transaction-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionCategory } from './../transaction-category';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transaction-category-editor',
  templateUrl: './transaction-category-editor.component.html',
  styleUrls: ['./transaction-category-editor.component.css']
})
export class TransactionCategoryEditorComponent implements OnInit {

  transactionCategory: TransactionCategory = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionCategoryService: TransactionCategoryService,
    private location: Location
  ) {
    this.transactionCategory = new TransactionCategory();
    this.transactionCategory.active = true;
  }

  ngOnInit() {
    let transactionCategoryId = this.route.snapshot.params['id'];
    if(transactionCategoryId){
      this.transactionCategoryService.getTransactionCategory(transactionCategoryId).then(transactionCategory => {
        this.transactionCategory = transactionCategory;
        this.loading = false;
      })
    }
  }

  submit(){
    this.transactionCategoryService.setTransactionCategory(this.transactionCategory)
      .then(transactionCategory => {
        this.router.navigate(['/transaction-category', transactionCategory.id])
      })
  }

  cancel(){
    this.location.back();
  }
}
