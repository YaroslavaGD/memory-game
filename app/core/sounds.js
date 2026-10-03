import { ACTION_TYPES, CARD_STATUS, GAME_STATUS } from "./constants.js";

const VOLUME_KEY = 'princes-memory-game:volume';

const SOUNDS_PATH = 'assets/sounds';

const SOUNDS_FILES = {
  CLICK: 'menu-button-click.wav',
  CHEW: 'chew.mp3',
  HMPH: 'hmph.wav',
  END_GAME: 'end-game.wav'
};

const DEFAULT_VOLUME = 0.2;

function loadVolume() {
  try {
    const saved = Number(localStorage.getItem(VOLUME_KEY));
    return localStorage.getItem(VOLUME_KEY) !== null && Number.isFinite(saved) 
      ? Math.min(1, Math.max(0, saved)) 
      : DEFAULT_VOLUME;
  } catch {
    return DEFAULT_VOLUME;
  }
}

let volume = loadVolume();
const audios = [];

function createSound(file) {
  const audio = new Audio(`${SOUNDS_PATH}/${file}`);
  audio.preload = 'auto';
  audio.volume = volume;
  audios.push(audio);

  return () => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };
}

const countRevealed = (state) => 
  state.cards.filter((card) => card.status !== CARD_STATUS.CLOSED).length;



export function getVolume() {
  return volume;
}

export function setVolume(value) {
  volume = Math.min(1, Math.max(0, value));
  audios.forEach((audio) => {
    audio.volume = volume;
  });

  try {
    localStorage.setItem(VOLUME_KEY, String(volume));
  } catch {}
}
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