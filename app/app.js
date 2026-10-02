import { createHeader } from "./ui/header.js";
import { createDeck } from "./ui/deck.js";
import { buildDeck } from "./core/deck.js";
import { PRINCES } from "./princes-data.js";
import { ACTION_TYPES, GAME_STATUS } from "./core/constants.js";
import { createStore } from "./store/store.js";
import { createInitialState, reducer } from "./core/reducer.js";
import { initTimer } from "./core/timer.js";
import { createStatistic } from "./ui/statistic.js";
import { createVerdict } from "./ui/verdict.js";
import { createModal } from "./ui/modal.js";
import { createWinContent } from "./ui/win-content.js";
import { selectWinner } from "./core/selectors.js";

const MAIN_CLASSES = {
  MAIN: 'main',
}

const store = createStore(reducer, createInitialState(buildDeck(PRINCES)));
initTimer(store);

function startNewGame() {
  store.dispatch({ type: ACTION_TYPES.NEW_GAME, deck: buildDeck(PRINCES) });
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
  const verdict = createVerdict();
  const main = document.createElement('main');
  main.classList.add(MAIN_CLASSES.MAIN);
  main.append(statistic.element, verdict.element, board.element);

  app.append(header.element, main);

  const modal = createModal();
  app.append(modal.element);

  store.subscribe((state, prev) => {
    const isJustWin = prev.gameStatus !== GAME_STATUS.WON && state.gameStatus === GAME_STATUS.WON;

    if (!isJustWin) return;

    const winner = selectWinner(state);
    const winContent = createWinContent(winner, state.moves, {
      onNewGame: () => {
        modal.close();
        startNewGame();
      },
      onClose: modal.close,
    });

    modal.open(winContent);
  });

  function render(state) {
    statistic.update(state);
    board.update(state);
    verdict.update(state);
  }

  render(store.getState());
  store.subscribe((state) => render(state));
}

init();