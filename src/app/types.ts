export class Post {
  id!: number;
  title!: string;
  description!: string;
  picture!: string;
}

export class User {
  id!: number;
  login!: string;
}

// Permet de décrire la réponse renvoyée
// par le serveur suite à la requête de
// login
export interface TokenUserPayload {
  token: string;
  user: User;
}