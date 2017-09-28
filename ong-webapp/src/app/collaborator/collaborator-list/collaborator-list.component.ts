import { ApiService } from './../../api/api.service';
import { ActivatedRoute } from '@angular/router';
import { Page } from './../../core/pagination/page';
import { Collaborator } from './../collaborator';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.css']
})
export class CollaboratorListComponent implements OnInit, OnDestroy {
  collaborators: Collaborator[];
  page: Page;
  queryParamsSubscription: Subscription;
  loading: boolean = true;
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {}

  export_csv(){
    this.apiService.get('exportCollaborators').toPromise().then(resp => {
      var a = document.createElement('a');
      var blob = new Blob([resp.text()], {type: resp.headers.get('content-type')});
      var url = window.URL.createObjectURL(blob);
      var now = new Date();
      a.href = url;
      a.download = `Colaboradores-${now.getDay()}-${now.getMonth()}-${now.getFullYear()}.csv`
      a.click();
      window.URL.revokeObjectURL(url);
    })
  }

  ngOnInit() {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.apiService
        .queryParams(params)
        .get('listCollaborators')
        .toPromise()
        .then(resp => {
          const response = resp.json();
          this.collaborators = response.results as Collaborator[];
          this.page = response.page as Page;
          this.loading = false;
        });
    });
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
  }
}
