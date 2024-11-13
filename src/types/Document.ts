type Document = {
  title: string;
  isbn: string;
  description?: string;
  cover_url?: File;
  acquisition_date?: Date;
  edition?: number;
  total_pages?: number;
  external_lend_allowed?: boolean;
  base_price?: number;
  total_copies: number;
  available_copies: number;
  language_id: number;
  format_id: number;
  publisher_id: number;
  mean_rating?: number;
  publication_year?: number;
};

type DocumentView = {
  id: number;
  title: string;
  isbn: string;
  description: string;
  publication_date: Date;
  edition: string;
  price: number;
  language: string;
  publisher: string;
};

export type { DocumentView, Document };
