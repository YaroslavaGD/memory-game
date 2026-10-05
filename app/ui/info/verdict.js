import { selectLastEaten, selectWinner } from "../../core/selectors.js";

const TEXT = {
  PLAY: 'Принцесса выбирает. Будьте осторожны.',
  WON: 'Принцесса выбрала.',
  EATEN: 'Не подошел.',
}

export function createVerdict() {
  const element = document.createElement('p');
  element.classList.add('verdict');
  element.setAttribute('role', 'status');

  function update(state) {
    const winner = selectWinner(state);
    const eaten = selectLastEaten(state);

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