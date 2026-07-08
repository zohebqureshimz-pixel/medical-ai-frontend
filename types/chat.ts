export interface Source {
  document: string;
  page: number;
  text: string;
}

export interface AskResponse {
  question: string;
  answer: string;
  sources: Source[];
}