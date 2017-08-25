import { Wallet } from './../wallet';
import { WalletService } from './../../api/wallet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
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
    private walletService: WalletService,
    private location: Location
  ) {
    this.wallet = new Wallet();
    this.wallet.active = true;
  }

  ngOnInit() {
    let walletId = this.route.snapshot.params['id'];
    if (walletId){
      this.walletService.getWallet(walletId).then( wallet => {
        this.wallet = wallet;
        this.loading = false;
      }).catch(error => console.log(error))
    }
  }

  submit(){
    this.walletService.setWallet(this.wallet)
      .then(wallet => {
        this.router.navigate(['/wallets', wallet.id])
      })
  }

  cancel(){
    this.location.back();
  }
}
