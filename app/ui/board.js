import { createCard } from "./card.js"; 

const BOARD_CLASSES = {
  BOARD: 'board',
}

export function createBoard(onCardClick) {
  const element = document.createElement('div');
  element.classList.add(BOARD_CLASSES.BOARD);

  // uid => { element, update}
  let items = new Map();
  
  function update(state) {
    const isNeedNew = items.size !== state.cards.length || 
                      state.cards.some((card) => !items.has(card.uid));

    if (isNeedNew) {
      items = new Map(); 

      element.replaceChildren();

      state.cards.forEach((c, index) => {
        const card = createCard(c, onCardClick, index + 1);
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