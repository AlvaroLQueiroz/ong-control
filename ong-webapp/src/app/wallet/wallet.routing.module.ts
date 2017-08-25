import { WalletEditorComponent } from './wallet-editor/wallet-editor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalletListComponent } from './wallet-list/wallet-list.component';
import { WalletViewerComponent } from './wallet-viewer/wallet-viewer.component';

const walletRoutes: Routes = [
    {path: '',
      component: WalletListComponent},
    {path: 'add',
      component: WalletEditorComponent},
    {path: ':id',
      component: WalletViewerComponent},
    {path: ':id/edit',
      component: WalletEditorComponent}
];

@NgModule({
    imports: [RouterModule.forChild(walletRoutes)],
    exports: [RouterModule]
})
export class WalletRoutingModule {}
