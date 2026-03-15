export interface User {
  login: string;
  name: string;
  email: string;
}

export function getUser(): User | null {
  const data = localStorage.getItem('user');
  return data ? JSON.parse(data) : null;
}

export function logout(): void {
  localStorage.removeItem('user');
}
