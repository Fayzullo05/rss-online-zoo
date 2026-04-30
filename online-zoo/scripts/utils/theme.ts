const THEME_KEY = 'theme';

export const getTheme = (): 'light' | 'dark' => {
  return (localStorage.getItem(THEME_KEY) as 'light' | 'dark') || 'light';
};

export const applyTheme = (theme: 'light' | 'dark') => {
  document.documentElement.setAttribute('data-theme', theme);
};

export const setTheme = (theme: 'light' | 'dark') => {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
};

export const toggleTheme = () => {
  const current = getTheme();
  setTheme(current === 'light' ? 'dark' : 'light');
};
