import { Component, OnInit } from '@angular/core';

import { WalletService } from './../../api/wallet.service';
import { Wallet } from './../wallet';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent implements OnInit {

  wallets: Wallet[];

  constructor(
    private walletService: WalletService
  ) { }

  ngOnInit() {
    this.walletService.getWallets().then(resp => {
      this.wallets = resp;
    })
  }

}
