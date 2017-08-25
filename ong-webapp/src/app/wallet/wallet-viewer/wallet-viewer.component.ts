import { WalletService } from './../../api/wallet.service';
import { Wallet } from './../wallet';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
    private walletService: WalletService,
  ) { }

  ngOnInit() {
    let walletId = this.route.snapshot.params['id'];
    if (walletId){
      this.walletService.getWallet(walletId).then( wallet => {
        this.wallet = wallet;
        this.loading = false;
      }).catch(error => console.log(error))
    }
  }

}
