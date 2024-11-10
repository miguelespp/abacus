type Document = {
  id: number;
  title: string;
  description: string;
  publication_date: Date;
  adition: string;
  price: number;
  language: string;
  author: string;
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

export type { Document, DocumentView };
