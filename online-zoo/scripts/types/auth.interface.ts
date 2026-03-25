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
  data: {
    access_token: string;
    user: {
      login: string;
      name: string;
      email: string;
    };
  };
  message: string;
}
