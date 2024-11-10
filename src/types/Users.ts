type User = {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  password_salt: string;
  firstname: string;
  surname: string;
  birth_date: Date;
  Address: string;
  mobile_phone: string;
  gender_id: number;
  role_id: number;
};

export type { User };
