import { User } from './user';

export class Profile {
  id: number;
  user: User;

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

