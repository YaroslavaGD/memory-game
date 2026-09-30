import { header } from "./modules/header.js";
import { cards } from "./modules/cards.js";

const App = (() => {
  return {
    init() {
      const app = document.createElement('div');
      app.id = 'app';
      document.body.appendChild(app);

      app.appendChild(header.init());
      app.appendChild(cards.init());
    }
  }
})();

window.addEventListener('DOMContentLoaded', () => {
  App.init();
});