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
    element.dataset.status = state.gameStatus;
    const isNeedNew = items.size !== state.cards.length || 
                      state.cards.some((card) => !items.has(card.uid));

    if (isNeedNew) {
      items = new Map(); 

      element.replaceChildren();

      state.cards.forEach((c, index) => {
        const card = createCard(c, onCardClick, index + 1);
        items.set(c.uid, card);

        if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
          card.element.animate(
            [{ opacity: 0, transform: 'translateY(-14px) rotate(-3deg)' }, { opacity: 1, transform: 'none' }],
            { duration: 450, delay: index * 35, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }
          );
        }

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