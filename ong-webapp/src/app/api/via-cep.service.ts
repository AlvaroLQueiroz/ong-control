import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ViaCepService {

  constructor(private http: Http) { }

  find_cep(cep: string): Observable<Response>{
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
