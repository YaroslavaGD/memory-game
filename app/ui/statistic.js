import { PAIRS_COUNT } from "../core/constants.js";

const STATISTIC_CLASSES = {
  STATISTIC: 'statistic',
  ITEM: 'statistic__item',
};

const TEXT = {
  MOVES: 'Ходы:',
  PAIRS: 'Пары:',
  FROM: 'из'
}

export function createStatistic() {
  const element = document.createElement('div');
  element.classList.add(STATISTIC_CLASSES.STATISTIC);

  const moves = document.createElement('span');
  moves.classList.add(STATISTIC_CLASSES.ITEM);

  const pairs = document.createElement('span');
  pairs.classList.add(STATISTIC_CLASSES.ITEM);

  element.append(moves, pairs);

  function update(state) {
    moves.textContent = `${TEXT.MOVES} ${state.moves}`;
    pairs.textContent = `${TEXT.PAIRS} ${state.matchedPairs} ${TEXT.FROM} ${PAIRS_COUNT}`;
  }

  return { element, update };
}