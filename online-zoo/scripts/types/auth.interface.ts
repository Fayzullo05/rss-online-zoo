export interface RegisterRequest {
  login: string;
  password: string;
  name: string;
  email: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  login: string;
  name: string;
  token?: string;
}
