import { header } from "./ui/header.js";
import { cards } from "./ui/cards.js";
import { buildDeck } from "./core/deck.js";
import { CARDS_DATA } from "./cards-data.js";
import { PAIRS_COUNT } from "./core/constants.js";

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

      console.log('deck = ', buildDeck(CARDS_DATA.slice(0, PAIRS_COUNT)));
    }
  }
})();

window.addEventListener('DOMContentLoaded', () => {
  App.init();
});