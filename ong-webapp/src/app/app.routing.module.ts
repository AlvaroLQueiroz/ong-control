import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login.component';

const appRoutes: Routes = [
    {path: 'login',
        component: LoginComponent},
    {path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
