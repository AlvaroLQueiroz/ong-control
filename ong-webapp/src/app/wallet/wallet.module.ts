import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { TransactionModule } from './../transaction/transaction.module';
import { CoreModule } from './../core/core.module';
import { WalletRoutingModule } from './wallet.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletListComponent } from './wallet-list/wallet-list.component';
import { WalletEditorComponent } from './wallet-editor/wallet-editor.component';
import { WalletViewerComponent } from './wallet-viewer/wallet-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    WalletRoutingModule,
    TransactionModule,
    FormsModule,
    MaterializeModule
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
