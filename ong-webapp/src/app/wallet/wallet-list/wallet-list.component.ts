import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { WalletService } from "./../../api/wallet.service";
import { Wallet } from "./../wallet";

@Component({
  selector: "app-wallet-list",
  templateUrl: "./wallet-list.component.html",
  styleUrls: ["./wallet-list.component.css"]
})
export class WalletListComponent implements OnInit {
  wallets: Wallet[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private walletService: WalletService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.walletService.getWallets(params).then(resp => {
        this.wallets = resp;
      });
    });
  }
}
