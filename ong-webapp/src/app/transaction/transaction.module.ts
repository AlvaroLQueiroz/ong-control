import { MaterializeModule } from 'angular2-materialize';
import { CoreModule } from './../core/core.module';
import { TransactionRoutingModule } from "./transaction.routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransactionListComponent } from './transaction-list/transaction-list.component';

@NgModule({
  imports: [CommonModule, TransactionRoutingModule, CoreModule, MaterializeModule],
  declarations: [TransactionListComponent],
  exports: [TransactionListComponent],
})
export class TransactionModule {}
