import { PAIRS_COUNT } from "../core/constants.js";

const STATS_CLASSES = {
  STATS: 'stats',
  ITEM: 'stats__item',
};

const TEXT = {
  MOVES: 'Ходы:',
  PAIRS: 'Пары:',
  FROM: 'из'
}

export function createStats() {
  const element = document.createElement('div');
  element.classList.add(STATS_CLASSES.STATS);
  element.setAttribute('role', 'status');

  const moves = document.createElement('span');
  moves.classList.add(STATS_CLASSES.ITEM);

  const pairs = document.createElement('span');
  pairs.classList.add(STATS_CLASSES.ITEM);

  element.append(moves, pairs);

  function update(state) {
    moves.textContent = `${TEXT.MOVES} ${state.moves}`;
    pairs.textContent = `${TEXT.PAIRS} ${state.matchedPairs} ${TEXT.FROM} ${PAIRS_COUNT}`;
  }

  return { element, update };
}