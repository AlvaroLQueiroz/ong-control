import { TransactionViewerComponent } from './transaction-viewer/transaction-viewer.component';
import { TransactionEditorComponent } from './transaction-editor/transaction-editor.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const transactionRoutes: Routes = [
  {
    path: '',
    component: TransactionListComponent
  },
  {
    path: 'add',
    component: TransactionEditorComponent
  },
  {
    path: ':id',
    component: TransactionViewerComponent
  },
  {
    path: ':id/edit',
    component: TransactionEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(transactionRoutes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule {}
