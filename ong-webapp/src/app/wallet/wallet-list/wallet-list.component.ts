import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ApiService } from './../../api/api.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Page } from './../../core/pagination/page';
import { Wallet } from './../wallet';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent implements OnInit, OnDestroy {
  wallets: Wallet[];
  page: Page;
  queryParamsSubscription: Subscription;
  loading: boolean = true;
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.apiService
        .queryParams(params)
        .get('listWallets')
        .toPromise()
        .then(resp => {
          const response = resp.json();
          this.wallets = response.results as Wallet[];
          this.page = response.page as Page;
          this.loading = false;
        });
    });
  }

  export_csv(){
    this.apiService.get('exportWallets').toPromise().then(resp => {
      var a = document.createElement('a');
      var blob = new Blob([resp.text()], {type: resp.headers.get('content-type')});
      var url = window.URL.createObjectURL(blob);
      var now = new Date();
      a.href = url;
      a.download = `Carteiras-${now.getDay()}-${now.getMonth()}-${now.getFullYear()}.csv`
      a.click();
      window.URL.revokeObjectURL(url);
    })
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
  }
}
