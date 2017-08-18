import { MaterializeModule } from 'angular2-materialize';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule
  ],
  declarations: [NavbarComponent, SidenavComponent],
  exports: [NavbarComponent, SidenavComponent]
})
export class MaterializeCssModule { }
