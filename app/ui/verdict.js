import { selectLastEaten, selectWinner } from "../core/selectors.js";

const TEXT = {
  PLAY: 'Принцесса выбирает жениха. Найдите пары!',
  WON: 'Принцесса выбрала:',
  EATEN: 'Принцесса съела:',
}

export function createVerdict() {
  const element = document.createElement('p');
  element.classList.add('verdict');

  function update(state) {
    const winner = selectWinner(state);
    const eaten = selectLastEaten(state);

    // const prince = princes.find((p) => p.id === state.lastMatchedId);

    if (winner) {
      element.textContent = `${TEXT.WON} ${winner.name}`;
    } else if (eaten) {
      element.textContent = `${TEXT.EATEN} ${eaten.name}. ${eaten.verdict}`;
    } else {
      element.textContent = TEXT.PLAY;
    }
  }

  return { element, update };
}