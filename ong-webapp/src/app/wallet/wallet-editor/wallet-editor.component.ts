import { ApiService } from './../../api/api.service';
import { Wallet } from './../wallet';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-wallet-editor',
  templateUrl: './wallet-editor.component.html',
  styleUrls: ['./wallet-editor.component.css']
})
export class WalletEditorComponent implements OnInit {
  wallet: Wallet = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private apiService: ApiService
  ) {
    this.wallet = new Wallet();
    this.wallet.active = true;
  }

  ngOnInit() {
    const walletId = this.route.snapshot.params['id'];
    if (walletId) {
      this.apiService
        .params(walletId)
        .get('getWallet')
        .toPromise()
        .then(resp => {
          this.wallet = resp.json() as Wallet;
          this.loading = false;
        })
        .catch(error => console.log(error));
    }
  }

  submit() {
    let request;
    if (this.wallet.id) {
      request = this.apiService
        .data(this.wallet)
        .params(this.wallet.id)
        .put('updateWallet')
        .toPromise();
    } else {
      request = this.apiService
        .data(this.wallet)
        .post('createWallet')
        .toPromise();
    }
    request.then(resp => {
      this.router.navigate(['/wallets', resp.json().id]);
    });
  }

  cancel() {
    this.location.back();
  }
}
