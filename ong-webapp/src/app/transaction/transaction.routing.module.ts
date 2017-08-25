import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const transactionRoutes: Routes = [
  // {path: '',
  //   component: WalletListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(transactionRoutes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule {}
