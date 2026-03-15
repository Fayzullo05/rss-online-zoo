export interface User {
  login: string;
  name: string;
  email: string;
}

export function getUser(): User | null {
  const data = localStorage.getItem('user');
  if (!data) return null;

  return JSON.parse(data);
}

export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function logout(): void {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}
