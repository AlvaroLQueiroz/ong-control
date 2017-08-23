import { AuthService } from './../../api/auth.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  sideNavActions = new EventEmitter<string|MaterializeAction>();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  sideNavOpen() {
    this.sideNavActions.emit({action: 'sideNav', params: ['show']});
  }

  logout(){
    this.authService.logout();
  }
}
