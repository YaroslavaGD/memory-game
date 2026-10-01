import { card } from "./card.js"; 

const MAIN_CLASSES = {
  MAIN: 'main',
  CARDS: 'cards',
}

const CARDS_LIMIT = 8;

function createCards() {
  function init() {
    const main = document.createElement('main');
    main.classList.add(MAIN_CLASSES.MAIN);

    const cards = document.createElement('div');
    cards.classList.add(MAIN_CLASSES.CARDS);

    for (let i = 0; i < CARDS_LIMIT; i++) {
      cards.appendChild(card.init(i));
      cards.appendChild(card.init(i));
    }

    main.appendChild(cards);
    return main;
  }

  return {
    init,
  }
}

export const cards = createCards();