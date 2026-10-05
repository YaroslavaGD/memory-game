import { PAIRS_COUNT } from "../../core/constants.js";

const STATS_CLASSES = {
  STATS: 'stats',
  ITEM: 'stats__item', 
  LABEL: 'stats__label',
  VALUE: 'stats__value',
};

const TEXT = {
  MOVES: 'Ходы:',
  PAIRS: 'Пары:',
};

function createStat(labelText) {
  const item = document.createElement('div');
  item.classList.add(STATS_CLASSES.ITEM);

  const label = document.createElement('span');
  label.classList.add(STATS_CLASSES.LABEL);
  label.textContent = labelText;

  const value = document.createElement('strong');
  value.classList.add(STATS_CLASSES.VALUE);

  item.append(label, value);

  return {
    element: item,
    value,
  };
}

export function createStats() {
  const element = document.createElement('div');
  element.classList.add(STATS_CLASSES.STATS);
  element.setAttribute('role', 'status');

  const moves = createStat(TEXT.MOVES);
  const pairs = createStat(TEXT.PAIRS);

  element.append(moves.element, pairs.element);

  function update(state) {
    moves.value.textContent = state.moves;
    pairs.value.textContent = `${state.matchedPairs} / ${PAIRS_COUNT}`;
    // moves.textContent = `${TEXT.MOVES} ${state.moves}`;
    // pairs.textContent = `${TEXT.PAIRS} ${state.matchedPairs} ${TEXT.FROM} ${PAIRS_COUNT}`;
  }

  return { element, update };
}