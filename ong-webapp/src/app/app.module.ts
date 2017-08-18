import { MaterializeCssModule } from './materialize-css/materialize-css.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterializeCssModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
