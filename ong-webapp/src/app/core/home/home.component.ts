import { ApiService } from './../../api/api.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public categoryLabels:string[];
  public categoryData:number[];
  public categoryType:string = 'doughnut';
  public walletLabels:string[];
  public walletData:number[];
  public walletType:string = 'doughnut';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.queryParams({'type': 'category'}).get('chartTransactions').toPromise().then(resp => {
      let response = resp.json();
      this.categoryLabels = response.labels;
      this.categoryData = response.data;
    })
    this.apiService.queryParams({'type': 'wallet'}).get('chartTransactions').toPromise().then(resp => {
      let response = resp.json();
      this.walletLabels = response.labels;
      this.walletData = response.data;
    })
  }

}
