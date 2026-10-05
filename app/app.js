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
import { createPrincess } from "./ui/info/princess.js";

const MAIN_CLASSES = {
  MAIN: 'main',
  TITLE: 'main__title',
  EYEBROW: 'main__eyebrow',
  HEADING: 'main__heading',
}
const EYEBROW_TEXT = 'Королевский отбор';
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
  app.classList.add('app');
  document.body.appendChild(app);

  const modal = createModal();

  function showLeaderboard() {
    modal.open(
      createLeaderboardContent(loadResults(), { onClose: modal.close })
    );
  }

  const volume = createVolume();

  const header = createHeader({
    onNewGame: startNewGame,
    onLeaderboard: showLeaderboard,
    volume: volume.element,
  });

  const title = document.createElement('h1');
  title.classList.add(MAIN_CLASSES.TITLE);
  title.textContent = TITLE_TEXT;

  const eyebrow = document.createElement('p');
  eyebrow.classList.add(MAIN_CLASSES.EYEBROW);
  eyebrow.textContent = EYEBROW_TEXT;

  const heading = document.createElement('div');
  heading.classList.add(MAIN_CLASSES.HEADING);
  heading.append(eyebrow, title);

  const princess = createPrincess();

  const stats = createStats();
  const board = createBoard((uid) => store.dispatch({ type: ACTION_TYPES.CARD_CLICKED, uid }));
  const verdict = createVerdict();
  const main = document.createElement('main');
  main.classList.add(MAIN_CLASSES.MAIN);

  main.append(
    heading, 
    princess.element,
    // verdict.element, 
    stats.element, 
    board.element
  );

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