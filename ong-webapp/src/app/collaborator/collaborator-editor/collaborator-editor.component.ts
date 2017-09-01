import { MaterializeAction } from 'angular2-materialize';
import { ViaCepService } from '../../api/via-cep.service';
import { User } from './../../api/user';
import { ApiService } from './../../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Collaborator } from './../collaborator';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
declare var Materialize: any;
@Component({
  selector: 'app-collaborator-editor',
  templateUrl: './collaborator-editor.component.html',
  styleUrls: ['./collaborator-editor.component.css']
})
export class CollaboratorEditorComponent implements OnInit {
  collaborator: Collaborator = null;
  loading: boolean = true;
  materializeActions = new EventEmitter<string | MaterializeAction>();
  genres: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private apiService: ApiService,
    private viaCepService: ViaCepService
  ) {
    this.collaborator = new Collaborator();
    this.collaborator.user = new User();
    this.collaborator.phones = [];

    this.collaborator.active = true;
    this.genres = [
      { id: null, label: '--------' },
      { id: 1, label: 'Mulher' },
      { id: 2, label: 'Homem' }
    ];
  }

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
          setTimeout(function() {
            Materialize.updateTextFields();
          }, 300);
        });
    } else {
      this.loading = false;
    }
  }

  submit() {
    let request;
    if (this.collaborator.id) {
      request = this.apiService
        .data(this.collaborator)
        .put('updateCollaborator')
        .toPromise();
    } else {
      request = this.apiService
        .data(this.collaborator)
        .post('createCollaborator')
        .toPromise();
    }

    request
      .then(collaborator => {
        this.router.navigate(['/collaborators']);
      })
      .catch(err => console.log(err));
  }

  cancel() {
    this.location.back();
  }

  searchCep(cep: string) {
    if (cep.length === 8) {
      this.viaCepService
        .find_cep(cep)
        .toPromise()
        .then(resp => {
          let response = resp.json();
          if (!response.erro) {
            this.collaborator.cep = response.cep;
            this.collaborator.logradouro = response.logradouro;
            this.collaborator.complemento = response.complemento;
            this.collaborator.bairro = response.bairro;
            this.collaborator.localidade = response.localidade;
            this.collaborator.uf = response.uf;
          }
        });
    }
  }
}
