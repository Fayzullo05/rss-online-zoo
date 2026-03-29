import { initHeaderAuth } from './components/headerAuth';
import { initDonationModal } from './components/donationModal';
import { renderHeader } from './components/header';
import { applyTheme, getTheme } from './utils/theme';

const getActivePage = (): string => {
  const path = window.location.pathname;

  if (path.includes('landing')) return 'about';
  if (path.includes('map')) return 'map';
  if (path.includes('animal')) return 'zoos';
  if (path.includes('contact')) return 'contact';

  return '';
};

const headerContainer = document.getElementById('headerContainer');

if (headerContainer) {
  headerContainer.innerHTML = renderHeader(getActivePage());
  initHeaderAuth();
}

initDonationModal();
applyTheme(getTheme());
