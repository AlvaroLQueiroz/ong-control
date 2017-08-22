import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  menuIsVisible: boolean;

  constructor(
    private authService: AuthService
  ){}

  ngOnInit(){
    this.menuIsVisible = this.authService.isAuthenticated();
    this.authService.showMenuEmitter.subscribe(
      showMenu => this.menuIsVisible = showMenu
    )
  }
}
