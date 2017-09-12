import { Beneficiary } from './../beneficiary';
import { ApiService } from './../../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beneficiary-viewer',
  templateUrl: './beneficiary-viewer.component.html',
  styleUrls: ['./beneficiary-viewer.component.css']
})
export class BeneficiaryViewerComponent implements OnInit {
  beneficiary: Beneficiary = null;
  loading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const collaboratorId = this.route.snapshot.params['id'];
    if (collaboratorId) {
      this.apiService
        .params(collaboratorId)
        .get('getBeneficiary')
        .toPromise()
        .then(resp => {
          this.beneficiary = resp.json() as Beneficiary;
          this.loading = false;
        })
        .catch(error => console.log(error));
    }
  }
}
