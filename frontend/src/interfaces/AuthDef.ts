export interface LoginResponse {
  message: string;
  token: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}