import { Profile } from '../../api/profile';
import { User } from './../../api/user';
import { ApiService } from './../../api/api.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  user: Profile;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.user = this.apiService.getUser();
  }

}
