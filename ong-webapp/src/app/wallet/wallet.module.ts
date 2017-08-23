import { WalletRoutingModule } from './wallet.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletListComponent } from './wallet-list/wallet-list.component';
import { WalletEditorComponent } from './wallet-editor/wallet-editor.component';
import { WalletViewerComponent } from './wallet-viewer/wallet-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    WalletRoutingModule
  ],
  declarations: [
    WalletListComponent,
    WalletEditorComponent,
    WalletViewerComponent,
  ],
  exports: [
    WalletListComponent
  ]
})
export class WalletModule { }
