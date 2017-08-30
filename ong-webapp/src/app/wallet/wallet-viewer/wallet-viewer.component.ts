import { ApiService } from '../../api/api.service';
import { Wallet } from './../wallet';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-wallet-viewer',
  templateUrl: './wallet-viewer.component.html',
  styleUrls: ['./wallet-viewer.component.css']
})
export class WalletViewerComponent implements OnInit {
  wallet: Wallet = null;
  loading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

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
}
