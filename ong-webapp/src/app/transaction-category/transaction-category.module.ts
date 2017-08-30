import { TransactionModule } from '../transaction/transaction.module';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './../core/core.module';
import { TransactionCategoryRoutingModule } from './transaction-category.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionCategoryListComponent } from './transaction-category-list/transaction-category-list.component';
import { TransactionCategoryEditorComponent } from './transaction-category-editor/transaction-category-editor.component';
import { TransactionCategoryViewerComponent } from './transaction-category-viewer/transaction-category-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    TransactionCategoryRoutingModule,
    CoreModule,
    FormsModule,
    MaterializeModule,
    TransactionModule
  ],
  declarations: [
    TransactionCategoryListComponent,
    TransactionCategoryEditorComponent,
    TransactionCategoryViewerComponent
  ],
  exports: []
})
export class TransactionCategoryModule {}
