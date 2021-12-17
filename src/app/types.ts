export interface Tag {
  id: number;
  title: string;
}

export interface Post {
  // ceux qui ont récupéré mon code
  id: number;
  title: string;
  description: string;
  picture: string;
  createdAt: string;
  likes: number;
  tags: Tag[];
}

export interface TokenPayload {
  token: string;
}

export interface CredentialsPayload {
  login: string;
  pwd: string;
}