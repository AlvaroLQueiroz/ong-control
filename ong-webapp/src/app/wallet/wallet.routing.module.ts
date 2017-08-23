import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalletListComponent } from './wallet-list/wallet-list.component';

const walletRoutes: Routes = [
    {path: '',
        component: WalletListComponent},
];

@NgModule({
    imports: [RouterModule.forChild(walletRoutes)],
    exports: [RouterModule]
})
export class WalletRoutingModule {}
