import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    RouterModule,
  ],
  declarations: [
    CardComponent,
    HomeComponent,
    NavbarComponent,
    SidenavComponent,
  ],
  exports: [
    CardComponent,
    HomeComponent,
    NavbarComponent,
    SidenavComponent,
  ]
})
export class CoreModule { }
