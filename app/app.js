import { header } from "./ui/header.js";
import { cards } from "./ui/cards.js";
import { buildDeck } from "./core/deck.js";
import { CARDS_DATA } from "./cards-data.js";
import { ACTION_TYPES, PAIRS_COUNT } from "./core/constants.js";
import { createStore } from "./store/store.js";
import { createInitialState, reducer } from "./core/reducer.js";

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

      const deck = buildDeck(CARDS_DATA.slice(0, PAIRS_COUNT));
      const store = createStore(reducer, createInitialState(deck));

      store.subscribe((state, action) => console.log(action.type, state));

      store.dispatch({ type: ACTION_TYPES.NEW_GAME, deck });

      store.dispatch({type: ACTION_TYPES.CARD_CLICKED, uid: 0});
      store.dispatch({type: ACTION_TYPES.CARD_CLICKED, uid: 13});
    }
  }
})();

window.addEventListener('DOMContentLoaded', () => {
  App.init();
});