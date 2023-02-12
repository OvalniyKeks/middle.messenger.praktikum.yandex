import { pages } from "./pages.js";

import './partials.js';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  app.innerHTML = pages.auth();
});
