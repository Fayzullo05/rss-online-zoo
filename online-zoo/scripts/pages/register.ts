import { registerUser } from '../services/auth.service';

const loginInput = document.getElementById('login') as HTMLInputElement;
const nameInput = document.getElementById('name') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const confirmInput = document.getElementById('confirmPassword') as HTMLInputElement;
const button = document.getElementById('registerButton') as HTMLButtonElement;
const errorText = document.getElementById('registerError');

function validateLogin(): boolean {
  return /^[A-Za-z][A-Za-z]{2,}$/.test(loginInput.value);
}

function validateName(): boolean {
  return /^[A-Za-z]{3,}$/.test(nameInput.value);
}

function validateEmail(): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
}

function validatePassword(): boolean {
  return /^(?=.*[!@#$%^&*]).{6,}$/.test(passwordInput.value);
}

function validateConfirm(): boolean {
  return passwordInput.value === confirmInput.value;
}

function updateButton(): void {
  const valid =
    validateLogin() && validateName() && validateEmail() && validatePassword() && validateConfirm();

  button.disabled = !valid;
}

loginInput.addEventListener('input', updateButton);
nameInput.addEventListener('input', updateButton);
emailInput.addEventListener('input', updateButton);
passwordInput.addEventListener('input', updateButton);
confirmInput.addEventListener('input', updateButton);

button.addEventListener('click', async () => {
  try {
    await registerUser({
      login: loginInput.value,
      password: passwordInput.value,
      name: nameInput.value,
      email: emailInput.value,
    });

    window.location.href = '../login/index.html';
  } catch {
    if (errorText) {
      errorText.textContent = 'Registration failed';
    }
  }
});
