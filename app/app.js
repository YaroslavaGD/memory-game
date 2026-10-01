import { createHeader } from "./ui/header.js";
import { createDeck } from "./ui/deck.js";
import { buildDeck } from "./core/deck.js";
import { CARDS_DATA } from "./cards-data.js";
import { ACTION_TYPES } from "./core/constants.js";
import { createStore } from "./store/store.js";
import { createInitialState, reducer } from "./core/reducer.js";
import { initTimer } from "./core/timer.js";
import { createStatistic } from "./ui/statistic.js";

const MAIN_CLASSES = {
  MAIN: 'main',
}

const store = createStore(reducer, createInitialState(buildDeck(CARDS_DATA)));
initTimer(store);

function startNewGame() {
  store.dispatch({ type: ACTION_TYPES.NEW_GAME, deck: buildDeck(CARDS_DATA) });
}

function showLeaders() {}

function init() {
  const app = document.createElement('div');
  app.id = 'app';
  document.body.appendChild(app);

  const header = createHeader({
    onNewGame: startNewGame,
    onLeaderBoard: showLeaders,
  });
  const statistic = createStatistic();
  const board = createDeck((uid) => store.dispatch({ type: ACTION_TYPES.CARD_CLICKED, uid }));
  const main = document.createElement('main');
  main.classList.add(MAIN_CLASSES.MAIN);
  main.append(statistic.element, board.element);

  app.append(header.element, main);

  function render(state) {
    statistic.update(state);
    board.update(state);
  }

  render(store.getState());
  store.subscribe((state) => render(state));
}

init();