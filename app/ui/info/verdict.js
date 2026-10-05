import { selectLastEaten, selectWinner } from "../../core/selectors.js";

const VERDICT_CLASSES = {
  VERDICT: 'verdict',
  STATUS: 'verdict__status',
  NAME: 'verdict__name',
  QUOTE: 'verdict__quote', 
};

const TEXT = {
  PLAY: '«Выберите мне достойного жениха.»',
  WON: 'Принцесса выбрала.',
  EATEN: 'Не подошел.',
}

export function createVerdict() {
  const element = document.createElement('section');
  element.classList.add(VERDICT_CLASSES.VERDICT);
  element.setAttribute('aria-live', 'polite');

  const status = document.createElement('p');
  status.classList.add(VERDICT_CLASSES.STATUS);

  const name = document.createElement('p');
  name.classList.add(VERDICT_CLASSES.NAME);

  const quote = document.createElement('p');
  quote.classList.add(VERDICT_CLASSES.QUOTE);

  element.append(status, name, quote);

  function update(state) {
    const winner = selectWinner(state);
    const eaten = selectLastEaten(state);

    if (winner) {
      status.textContent = TEXT.WON;
      name.textContent = winner.name;
      quote.textContent = `«${winner.verdict}»`;
      return;
    }
    if (eaten) {
      status.textContent = TEXT.EATEN;
      name.textContent = eaten.name;
      quote.textContent = `«${eaten.verdict}»`;
      return;
    } 

    status.textContent = TEXT.PLAY;
    name.textContent = '';
    quote.textContent = '';
  }

  return { element, update };
}