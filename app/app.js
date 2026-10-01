import { header } from "./ui/header.js";
import { cards } from "./ui/cards.js";
import { shuffle } from "./core/shuffle.js";
import { buildDeck } from "./core/deck.js";
import { CARDS_DATA } from "./cards-data.js";

const MAIN_CLASSES = {
  MAIN: 'main',
}

const App = (() => {
  return {
    init() {
      const app = document.createElement('div');
      app.id = 'app';
      document.body.appendChild(app);

      const main = document.createElement('main');
      main.classList.add(MAIN_CLASSES.MAIN);
      main.appendChild(cards.init());

      app.appendChild(header.init());
      app.appendChild(main);

      console.log('deck = ', buildDeck(CARDS_DATA.slice(0, 8)));
    }
  }
})();

window.addEventListener('DOMContentLoaded', () => {
  App.init();
});