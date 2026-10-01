import { PAIRS_COUNT } from "../core/constants.js";
import { card } from "./card.js"; 

const CARDS_CLASSES = {
  CARDS: 'cards',
}

function createCards() {
  function init() {
    const cards = document.createElement('div');
    cards.classList.add(CARDS_CLASSES.CARDS);

    for (let i = 0; i < PAIRS_COUNT; i++) {
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