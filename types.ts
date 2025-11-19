export interface GeneratedEmail {
  id: string;
  fullEmail: string;
  username: string;
  counter: number;
  domain: string;
  timestamp: Date;
}

export interface EmailFormState {
  username: string;
  domain: string;
  counter: number;
}