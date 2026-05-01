import { getUser, logout } from '../utils/auth';
import { getTheme, toggleTheme } from '../utils/theme';

export function initHeaderAuth(): void {
  const user = getUser();

  const userBlock = document.getElementById('headerUser');
  const userName = document.getElementById('userName');
  const menu = document.getElementById('userMenu');

  if (!userBlock || !menu) return;

  if (user && userName) {
    userName.textContent = user.name;
  }

  userBlock.addEventListener('click', () => {
    menu.classList.toggle('open');

    if (!user) {
      menu.innerHTML = `
        <a href="../../pages/login/index.html">Sign In</a>
        <a href="../../pages/register/index.html">Registration</a>
      `;
    } else {
      menu.innerHTML = `
        <div class="user-info">
          <p>${user.name}</p>
          <p>${user.email}</p>
        </div>

        <button id="logoutButton">Sign Out</button>
      `;

      const logoutButton = document.getElementById('logoutButton');

      logoutButton?.addEventListener('click', () => {
        logout();
        location.reload();
      });
    }
  });

  const themeButton = document.getElementById('themeToggle');

  if (themeButton) {
    const updateIcon = () => {
      themeButton.textContent = getTheme() === 'dark' ? '☀️' : '🌙';
    };

    updateIcon();

    themeButton.addEventListener('click', () => {
      toggleTheme();
      updateIcon();
    });
  }
}
