import { card } from "./card.js"; 

const CARDS_CLASSES = {
  CARDS: 'cards',
}

const CARDS_LIMIT = 8;

function createCards() {
  function init() {
    const cards = document.createElement('div');
    cards.classList.add(CARDS_CLASSES.CARDS);

    for (let i = 0; i < CARDS_LIMIT; i++) {
      cards.appendChild(card.init(i));
      cards.appendChild(card.init(i));
    }

    return cards;
  }

  return {
    init,
  }
}

export const cards = createCards();