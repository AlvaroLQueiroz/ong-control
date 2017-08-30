import { ApiService } from './../../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionCategory, TransactionType } from './../transaction-category';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-transaction-category-viewer',
  templateUrl: './transaction-category-viewer.component.html',
  styleUrls: ['./transaction-category-viewer.component.css']
})
export class TransactionCategoryViewerComponent implements OnInit {
  transactionCategory: TransactionCategory = null;
  loading: boolean = true;
  transactionType: any = TransactionType;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const transactionCategoryId = this.route.snapshot.params['id'];
    if (transactionCategoryId) {
      this.apiService
        .params(transactionCategoryId)
        .get('getTransactionCategory')
        .toPromise()
        .then(resp => {
          this.transactionCategory = resp.json() as TransactionCategory;
          this.loading = false;
        });
    }
  }
}
