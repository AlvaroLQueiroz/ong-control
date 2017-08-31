import { Subscription } from 'rxjs/Rx';
import { ApiService } from './api/api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  menuIsVisible: boolean;
  apiSubscription: Subscription;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiSubscription = this.apiService.isAuthenticated.subscribe(showMenu => {
      this.menuIsVisible = showMenu;
    });
  }

  ngOnDestroy() {
    this.apiSubscription.unsubscribe();
  }
}
