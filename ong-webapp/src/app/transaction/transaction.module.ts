import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { CoreModule } from './../core/core.module';
import { TransactionRoutingModule } from "./transaction.routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionViewerComponent } from './transaction-viewer/transaction-viewer.component';
import { TransactionEditorComponent } from './transaction-editor/transaction-editor.component';

@NgModule({
  imports: [CommonModule, TransactionRoutingModule, CoreModule, MaterializeModule, FormsModule],
  declarations: [TransactionListComponent, TransactionViewerComponent, TransactionEditorComponent],
  exports: [TransactionListComponent],
})
export class TransactionModule {}
