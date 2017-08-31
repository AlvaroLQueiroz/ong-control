import { User } from '../../api/user';
import { ApiService } from './../../api/api.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sideNavActions = new EventEmitter<string | MaterializeAction>();
  user: User;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.user = this.apiService.getUser();
  }

  sideNavOpen() {
    this.sideNavActions.emit({ action: 'sideNav', params: ['show'] });
  }

  logout() {
    this.apiService.logout();
  }
}
