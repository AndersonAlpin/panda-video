export interface UserSession {
  id: number;
  name: string;
  email: string;
}

export interface UserCreateDTO {
  name: string;
  email: string;
  password: string;
}

export interface UserUpdateDTO {
  id: number;
  name?: string;
  email?: string;
  password?: string;
}
