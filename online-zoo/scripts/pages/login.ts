import { loginUser } from '../services/auth.service';

const loginInput = document.getElementById('login') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const button = document.getElementById('signInButton') as HTMLButtonElement;
const errorText = document.getElementById('loginError');

const loginValidation = document.getElementById('loginValidation');
const passwordValidation = document.getElementById('passwordValidation');

loginInput.addEventListener('blur', () => {
  if (!validateLogin()) {
    loginInput.classList.add('input-error');

    if (loginValidation) {
      loginValidation.textContent = 'Login must start with a letter';
    }
  }
});

passwordInput.addEventListener('blur', () => {
  if (!validatePassword()) {
    passwordInput.classList.add('input-error');

    if (passwordValidation) {
      passwordValidation.textContent = 'Password must contain special character';
    }
  }
});

loginInput.addEventListener('focus', () => {
  loginInput.classList.remove('input-error');
  if (loginValidation) loginValidation.textContent = '';
});

passwordInput.addEventListener('focus', () => {
  passwordInput.classList.remove('input-error');
  if (passwordValidation) passwordValidation.textContent = '';
});

function validateLogin(): boolean {
  return /^[A-Za-z][A-Za-z]{2,}$/.test(loginInput.value);
}

function validatePassword(): boolean {
  return /^(?=.*[!@#$%^&*]).{6,}$/.test(passwordInput.value);
}

function updateButton(): void {
  const valid = validateLogin() && validatePassword();

  button.disabled = !valid;
}

loginInput.addEventListener('input', updateButton);
passwordInput.addEventListener('input', updateButton);

button.addEventListener('click', async () => {
  try {
    const response = await loginUser({
      login: loginInput.value,
      password: passwordInput.value,
    });

    const user = response.data.user;
    const token = response.data.access_token;

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    window.location.href = '../../pages/landing/index.html';
  } catch {
    if (errorText) {
      errorText.textContent = 'Incorrect login or password';
    }
  }
});
