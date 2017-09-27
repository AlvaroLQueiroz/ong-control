import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CoreModule } from './../core/core.module';
import { MaterializeModule } from 'angular2-materialize';
import { TransactionModule } from './../transaction/transaction.module';
import { WalletEditorComponent } from './wallet-editor/wallet-editor.component';
import { WalletListComponent } from './wallet-list/wallet-list.component';
import { WalletRoutingModule } from './wallet.routing.module';
import { WalletViewerComponent } from './wallet-viewer/wallet-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    MaterializeModule,
    WalletRoutingModule,
    TransactionModule,
  ],
  declarations: [
    WalletListComponent,
    WalletEditorComponent,
    WalletViewerComponent,
  ],
  exports: [
  ]
})
export class WalletModule { }
