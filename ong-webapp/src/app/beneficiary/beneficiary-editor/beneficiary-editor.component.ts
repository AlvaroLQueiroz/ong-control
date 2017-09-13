import { Beneficiary } from './../beneficiary';
import { MaterializeAction } from 'angular2-materialize';
import { ViaCepService } from '../../api/via-cep.service';
import { User } from './../../api/user';
import { ApiService } from './../../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
declare var Materialize: any;
declare var $:any;
@Component({
  selector: 'app-beneficiary-editor',
  templateUrl: './beneficiary-editor.component.html',
  styleUrls: ['./beneficiary-editor.component.css']
})
export class BeneficiaryEditorComponent implements OnInit {
  beneficiary: Beneficiary = null;
  beneficiaries: Beneficiary[];
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
    this.beneficiary = new Beneficiary();
    this.beneficiary.user = new User();
    this.beneficiary.phones = [];

    this.beneficiary.active = true;
    this.genres = [
      { id: null, label: '--------' },
      { id: 1, label: 'Mulher' },
      { id: 2, label: 'Homem' }
    ];
  }

  ngOnInit() {
    const beneficiaryId = this.route.snapshot.params['id'];
    if (beneficiaryId) {
      this.apiService
        .params(beneficiaryId)
        .get('getBeneficiary')
        .toPromise()
        .then(resp => {
          this.beneficiary = resp.json() as Beneficiary;
          this.loading = false;
          setTimeout(function() {
            Materialize.updateTextFields();
          }, 300);
        });
    } else {
      this.loading = false;
    }
    this.apiService.get('listBeneficiaries').toPromise().then(resp => {
      this.beneficiaries = resp.json().results as Beneficiary[];
      setTimeout(() =>{
        $('select').material_select('destroy');
        $('select').material_select();
      }, 300)
    })
  }

  submit() {
    console.log(this.beneficiary)
    let request;
    if (this.beneficiary.id) {
      request = this.apiService
        .data(this.beneficiary)
        .put('updateBeneficiary')
        .toPromise();
    } else {
      request = this.apiService
        .data(this.beneficiary)
        .post('createBeneficiary')
        .toPromise();
    }

    request
      .then(beneficiary => {
        this.router.navigate(['/beneficiaries']);
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
            this.beneficiary.cep = response.cep;
            this.beneficiary.logradouro = response.logradouro;
            this.beneficiary.complemento = response.complemento;
            this.beneficiary.bairro = response.bairro;
            this.beneficiary.localidade = response.localidade;
            this.beneficiary.uf = response.uf;
          }
        });
    }
  }
}
