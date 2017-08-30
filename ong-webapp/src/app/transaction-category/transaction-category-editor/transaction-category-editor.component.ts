import { ApiService } from './../../api/api.service';
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
    private apiService: ApiService,
    private location: Location
  ) {
    this.transactionCategory = new TransactionCategory();
    this.transactionCategory.active = true;
  }

  ngOnInit() {
    const transactionCategoryId = this.route.snapshot.params['id'];
    if (transactionCategoryId) {
      this.apiService
        .params(transactionCategoryId)
        .get('getTransactionCategory')
        .toPromise()
        .then(resp => {
          const response = resp.json();
          this.transactionCategory = response.results as TransactionCategory;
          this.loading = false;
        });
    }
  }

  submit() {
    let request;
    if (this.transactionCategory.id) {
      request = this.apiService
        .data(this.transactionCategory)
        .params(this.transactionCategory.id)
        .put('updateTransactionCategory');
    } else {
      request = this.apiService.data(this.transactionCategory).post('createTransactionCategory');
    }
    request.toPromise().then(resp => {
      this.router.navigate(['/transaction-category', resp.json().id]);
    });
  }

  cancel() {
    this.location.back();
  }
}
