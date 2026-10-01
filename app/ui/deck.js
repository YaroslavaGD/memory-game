import { createCard } from "./card.js"; 

const DECK_CLASSES = {
  CARDS: 'cards',
}

export function createDeck(onCardClick) {
  const element = document.createElement('div');
  element.classList.add(DECK_CLASSES.CARDS);

  let items = new Map();
  
  function update(state) {
    const isNeedNew = items.size !== state.cards.length || 
                      state.cards.some((card) => !items.has(card.uid));

    if (isNeedNew) {
      // uid => { element, update}
      items = new Map(); 

      element.replaceChildren();

      state.cards.forEach((c) => {
        const card = createCard(c, onCardClick);
        items.set(c.uid, card);

        element.appendChild(card.element);
      });
      return;
    }

    state.cards.forEach((card) => items.get(card.uid).update(card));
  }

  return {
    element,
    update,
  };
}