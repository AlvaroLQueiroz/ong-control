import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CardComponent } from './card/card.component';
import { ButtonBackComponent } from './button-back/button-back.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    RouterModule,
    ChartsModule,
  ],
  declarations: [
    CardComponent,
    HomeComponent,
    NavbarComponent,
    SidenavComponent,
    ButtonBackComponent,
    PaginationComponent,
  ],
  exports: [
    CardComponent,
    HomeComponent,
    NavbarComponent,
    SidenavComponent,
    ButtonBackComponent,
    PaginationComponent,
  ]
})
export class CoreModule { }
