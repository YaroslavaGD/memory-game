import { GAME_STATUS } from "../core/constants.js";

const TEXT = {
  PLAY: 'Принцесса выбирает жениха. Найдите пары!',
  WON: 'Принцесса выбрала:',
  MISMATCHED: 'Принцесса съела:',
}

export function createVerdict(princes) {
  const element = document.createElement('p');
  element.classList.add('verdict');

  function update(state) {
    const prince = princes.find((p) => p.id === state.lastMatchedId);

    if (!prince) {
      element.textContent = TEXT.PLAY;
    } else if (state.gameStatus === GAME_STATUS.WON) {
      element.textContent = `${TEXT.WON}: ${prince.name}`;
    } else {
      element.textContent = `${TEXT.MISMATCHED}: ${prince.name}. ${prince.verdict}`;
    }
  }

  return { element, update };
}