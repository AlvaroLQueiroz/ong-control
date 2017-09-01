export class User {
  id: number;
  auth_token: string;
  username: string;
  is_active: boolean;
  first_name: string;
  last_name: string;
  email: string;
}

export class Login {
  username: string;
  password: string;
}
