interface AuthorBase {
  name: string;
  birth_date: Date;
  death_date?: Date;
  bio?: string;
  gender_id: number;
  country_id: number;
  image_url?: File;
}

interface AuthorView extends AuthorBase {
  id: number;
}

interface AuthorTable extends Pick<AuthorView, "id" | "name" | "birth_date"> {}

export type { AuthorBase, AuthorView, AuthorTable };
