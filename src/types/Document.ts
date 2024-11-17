type Document = {
  title: string;
  ISBN: string;
  description?: string;
  cover_url?: File;
  acquisition_date?: Date;
  edition?: number;
  total_pages?: number;
  external_lend_allowed?: boolean;
  price?: number;
  total_copies: number;
  available_copies: number;
  language_id: number;
  format_id: number;
  publisher_id: number;
  mean_rating?: number | null;
  publication_year?: number;
};

type DocumentView = {
  id: number;
  title: string;
  isbn: string;
  description: string;
  publication_year: string;
  edition: string;
  base_price: number;
  language_name: string;
  publisher_name: string;
};

export type { DocumentView, Document };
