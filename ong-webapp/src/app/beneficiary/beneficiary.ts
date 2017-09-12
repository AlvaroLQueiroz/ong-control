import { Phone } from './../core/phone';
import { User } from '../api/user';

export class Beneficiary {
  id: number;
  user: User;
  phones: Phone[];
  guardians: Beneficiary[];

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
}

