import { Beneficiary } from './../beneficiary';
import { ApiService } from './../../api/api.service';
import { ActivatedRoute } from '@angular/router';
import { Page } from './../../core/pagination/page';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-beneficiary-list',
  templateUrl: './beneficiary-list.component.html',
  styleUrls: ['./beneficiary-list.component.css']
})
export class BeneficiaryListComponent implements OnInit, OnDestroy {
  beneficiaries: Beneficiary[];
  page: Page;
  queryParamsSubscription: Subscription;
  loading: boolean = true;
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.apiService
        .queryParams(params)
        .get('listBeneficiaries')
        .toPromise()
        .then(resp => {
          const response = resp.json();
          this.beneficiaries = response.results as Beneficiary[];
          this.page = response.page as Page;
          this.loading = false;
        });
    });
  }

  export_csv(){
    this.apiService.get('exportBeneficiary').toPromise().then(resp => {
      var a = document.createElement('a');
      var blob = new Blob([resp.text()], {type: resp.headers.get('content-type')});
      var url = window.URL.createObjectURL(blob);
      var now = new Date();
      a.href = url;
      a.download = `Beneficiarios-${now.getDay()}-${now.getMonth()}-${now.getFullYear()}.csv`
      a.click();
      window.URL.revokeObjectURL(url);
    })
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
  }
}
