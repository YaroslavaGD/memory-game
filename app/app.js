import { createHeader } from "./ui/header.js";
import { createBoard } from "./ui/board.js";
import { buildCards } from "./core/cards.js";
import { PRINCES } from "./princes-data.js";
import { ACTION_TYPES, GAME_STATUS } from "./core/constants.js";
import { createStore } from "./store/store.js";
import { createInitialState, reducer } from "./core/reducer.js";
import { setupMismatchTimer } from "./core/timer.js";
import { createStats } from "./ui/stats.js";
import { createVerdict } from "./ui/verdict.js";
import { createModal } from "./ui/modal.js";
import { createWinContent } from "./ui/win-content.js";
import { selectWinner } from "./core/selectors.js";

const MAIN_CLASSES = {
  MAIN: 'main',
}

const store = createStore(reducer, createInitialState(buildCards(PRINCES)));
setupMismatchTimer(store);

function startNewGame() {
  store.dispatch({ type: ACTION_TYPES.NEW_GAME, cards: buildCards(PRINCES) });
}

function showLeaderBoard() {}

function init() {
  const app = document.createElement('div');
  app.id = 'app';
  document.body.appendChild(app);

  const header = createHeader({
    onNewGame: startNewGame,
    onLeaderBoard: showLeaderBoard,
  });
  const stats = createStats();
  const board = createBoard((uid) => store.dispatch({ type: ACTION_TYPES.CARD_CLICKED, uid }));
  const verdict = createVerdict();
  const main = document.createElement('main');
  main.classList.add(MAIN_CLASSES.MAIN);
  main.append(stats.element, verdict.element, board.element);

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
    stats.update(state);
    board.update(state);
    verdict.update(state);
  }

  render(store.getState());
  store.subscribe((state) => render(state));
}

init();