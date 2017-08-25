import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { AuthGuard } from "./auth/auth.guard";
import { HomeComponent } from "./core/home/home.component";
import { LoginComponent } from "./auth/login/login.component";

const appRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: "wallets",
    loadChildren: "app/wallet/wallet.module#WalletModule",
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: "transactions",
    loadChildren: "app/transaction/transaction.module#TransactionModule",
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
