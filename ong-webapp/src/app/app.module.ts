import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterializeCssModule } from './materialize-css/materialize-css.module';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AppRoutingModule } from './app.routing.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MaterializeCssModule,
    AuthModule,
    ProfileModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
