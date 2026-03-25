import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        landing: 'pages/landing/index.html',
        login: 'pages/login/index.html',
        register: 'pages/register/index.html',
        map: 'pages/map/index.html',
        animals: 'pages/animal/index.html',
        contact: 'pages/contact/index.html',
      },
    },
  },
});
