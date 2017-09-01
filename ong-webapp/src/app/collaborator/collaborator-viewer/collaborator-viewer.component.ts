import { ApiService } from './../../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Collaborator } from './../collaborator';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collaborator-viewer',
  templateUrl: './collaborator-viewer.component.html',
  styleUrls: ['./collaborator-viewer.component.css']
})
export class CollaboratorViewerComponent implements OnInit {
  collaborator: Collaborator = null;
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
        .get('getCollaborator')
        .toPromise()
        .then(resp => {
          this.collaborator = resp.json() as Collaborator;
          this.loading = false;
        })
        .catch(error => console.log(error));
    }
  }
}
