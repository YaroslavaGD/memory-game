import { header } from "./ui/header.js";
import { createDeck } from "./ui/deck.js";
import { buildDeck } from "./core/deck.js";
import { CARDS_DATA } from "./cards-data.js";
import { ACTION_TYPES } from "./core/constants.js";
import { createStore } from "./store/store.js";
import { createInitialState, reducer } from "./core/reducer.js";
import { initTimer } from "./core/timer.js";

const MAIN_CLASSES = {
  MAIN: 'main',
}


const store = createStore(reducer, createInitialState(buildDeck(CARDS_DATA)));

const App = (() => {
  return {
    init() {
      const app = document.createElement('div');
      app.id = 'app';
      document.body.appendChild(app);
      app.appendChild(header.init());

      const board = createDeck((uid) => store.dispatch({ type: ACTION_TYPES.CARD_CLICKED, uid }));

      const main = document.createElement('main');
      main.classList.add(MAIN_CLASSES.MAIN);
      main.appendChild(board.element);
      app.appendChild(main);

      board.update(store.getState());
      store.subscribe((state) => board.update(state));

      initTimer(store);
    }
  }
})();

window.addEventListener('DOMContentLoaded', () => {
  App.init();
});