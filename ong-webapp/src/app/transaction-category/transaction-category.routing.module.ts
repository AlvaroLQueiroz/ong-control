import { TransactionCategoryViewerComponent } from './transaction-category-viewer/transaction-category-viewer.component';
import { TransactionCategoryEditorComponent } from './transaction-category-editor/transaction-category-editor.component';
import { TransactionCategoryListComponent } from './transaction-category-list/transaction-category-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const transactionCategoryRoutes: Routes = [
  {
    path: '',
    component: TransactionCategoryListComponent
  },
  {
    path: 'add',
    component: TransactionCategoryEditorComponent
  },
  {
    path: ':id',
    component: TransactionCategoryViewerComponent
  },
  {
    path: ':id/edit',
    component: TransactionCategoryEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(transactionCategoryRoutes)],
  exports: [RouterModule]
})
export class TransactionCategoryRoutingModule {}
