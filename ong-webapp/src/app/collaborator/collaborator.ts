import { Phone } from './../core/phone';
import { User } from '../api/user';

export class Collaborator {
  id: number;
  user: User;
  phones: Phone[];

  active: boolean;
  cpf: string;
  rg: string;
  birth_date: Date;
  genre: string;

  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
}
