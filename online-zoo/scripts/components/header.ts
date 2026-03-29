export const renderHeader = (activePage: string) => {
  return `
    <header>
      <div class="logo">
        <img src="../../assets/contact/Logo.svg" alt="Online-zoo logo" />
      </div>

      <nav>
        <ul class="header-nav">
          <li><a href="../landing/index.html" class="${activePage === 'about' ? 'active' : ''}">About</a></li>
          <li><a href="../map/index.html" class="${activePage === 'map' ? 'active' : ''}">Map</a></li>
          <li><a href="../animal/index.html" class="${activePage === 'zoos' ? 'active' : ''}">Zoos</a></li>
          <li><a href="../contact/index.html" class="${activePage === 'contact' ? 'active' : ''}">Contact us</a></li>
          <li><a href="../contact/index.html">Design</a></li>
        </ul>
      </nav>

      <div class="header-social">
        <a href="https://www.youtube.com">
          <img src="../../assets/contact/YouTube.svg" alt="YouTube" />
        </a>
        <a href="https://www.instagram.com">
          <img src="../../assets/contact/Instagram.svg" alt="Instagram" />
        </a>
        <a href="https://www.facebook.com">
          <img src="../../assets/contact/Facebook.svg" alt="Facebook" />
        </a>
      </div>

      <div class="burger">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div class="header-user" id="headerUser">
        <img src="../../assets/header-icon.svg" alt="User" class="user-icon" />
        <span id="userName"></span>
      </div>

      <div class="user-menu" id="userMenu"></div>
    </header>
  `;
};
