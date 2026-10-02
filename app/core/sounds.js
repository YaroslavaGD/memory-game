import { ACTION_TYPES, CARD_STATUS, GAME_STATUS } from "./constants.js";

const SOUNDS_PATH = 'assets/sounds';

const SOUNDS_FILES = {
  CLICK: 'menu-button-click.wav',
  CHEW: 'chew.ogg',
  HMPH: 'hmph.wav',
  END_GAME: 'end-game.wav'
};

function createSound(file) {
  const audio = new Audio(`${SOUNDS_PATH}/${file}`);
  audio.preload = 'auto';

  return () => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };
}

const countRevealed = (state) => 
  state.cards.filter((card) => card.status !== CARD_STATUS.CLOSED).length;

export function setupSounds(store) {
  const play = {
    click: createSound(SOUNDS_FILES.CLICK),
    chew: createSound(SOUNDS_FILES.CHEW),
    hmph: createSound(SOUNDS_FILES.HMPH),
    endGame: createSound(SOUNDS_FILES.END_GAME)
  };

  store.subscribe((state, prev, action) => {
    if (action.type !== ACTION_TYPES.CARD_CLICKED) return;

    if (countRevealed(state) > countRevealed(prev)) play.click();

    if (state.gameStatus === GAME_STATUS.CHECKING) play.hmph();

    if (state.gameStatus === GAME_STATUS.WON) {
      play.endGame();
    } else if (state.matchedPairs > prev.matchedPairs) {
      play.chew();
    }
  });
}