import { createHeader } from "./ui/header/header.js";
import { createBoard } from "./ui/board-card/board.js";
import { buildCards } from "./core/cards.js";
import { PRINCES } from "./princes-data.js";
import { ACTION_TYPES } from "./core/constants.js";
import { createStore } from "./store/store.js";
import { createInitialState, reducer } from "./core/reducer.js";
import { setupMismatchTimer } from "./effects/timer.js";
import { createStats } from "./ui/info/stats.js";
import { createVerdict } from "./ui/info/verdict.js";
import { createModal } from "./ui/modal/modal.js";
import { createLeaderboardContent } from "./ui/modal/leaderboard-content.js";
import { loadResults } from "./services/leaderboard-storage.js";
import { setupSounds } from "./effects/sounds.js";
import { createVolume } from "./ui/header/volume.js";
import { CARD_CLASSES } from "./ui/board-card/card.js";
import { setupLeaderboardSave, setupWinModal } from "./effects/win.js";

const MAIN_CLASSES = {
  MAIN: 'main',
  TITLE: 'main__title',
}

const TITLE_TEXT = 'Не тот и не этот';

const store = createStore(reducer, createInitialState(buildCards(PRINCES)));
setupMismatchTimer(store);
setupSounds(store);

function startNewGame() {
  store.dispatch({ type: ACTION_TYPES.NEW_GAME, cards: buildCards(PRINCES) });
  document.querySelector(`.${CARD_CLASSES.CARD}`)?.focus();
}

function init() {
  const app = document.createElement('div');
  app.id = 'app';
  document.body.appendChild(app);

  const modal = createModal();

  function showLeaderboard() {
    modal.open(
      createLeaderboardContent(loadResults(), { onClose: modal.close })
    );
  }

  const header = createHeader({
    onNewGame: startNewGame,
    onLeaderboard: showLeaderboard,
  });

  const volume = createVolume();
  header.element.append(volume.element);

  const title = document.createElement('h1');
  title.classList.add(MAIN_CLASSES.TITLE);
  title.textContent = TITLE_TEXT;

  const stats = createStats();
  const board = createBoard((uid) => store.dispatch({ type: ACTION_TYPES.CARD_CLICKED, uid }));
  const verdict = createVerdict();
  const main = document.createElement('main');
  main.classList.add(MAIN_CLASSES.MAIN);
  main.append(title, verdict.element, stats.element, board.element);

  app.append(header.element, main);
  app.append(modal.element);

  setupLeaderboardSave(store);
  setupWinModal(store, modal, startNewGame);

  function render(state) {
    stats.update(state);
    board.update(state);
    verdict.update(state);
  }

  render(store.getState());
  store.subscribe((state) => render(state));
}

init();