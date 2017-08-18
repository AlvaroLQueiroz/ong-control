import { Component, EventEmitter, OnInit } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  // sideNavActions = new EventEmitter<string|MaterializeAction>();

  constructor() { }

  ngOnInit() {
  }

  // sideNavOpen(){
  //   this.sideNavActions.emit({action:"sideNav", params:["show"]});
  // }
}
