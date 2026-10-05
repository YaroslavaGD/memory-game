import { CARD_STATUS } from "../../core/constants.js";

export const CARD_CLASSES = {
  CARD: 'card',
  CONTENT: 'card__content',
  IMG: 'card__img',
  IMG_FRONT: 'card__img--front',
  IMG_BACK: 'card__img--back',
};

const BACK_IMG_PATH = 'assets/ui/card_cover-2x.png';
export function createCard(card, onClick, position) {
    const element = document.createElement('button');
    element.classList.add(CARD_CLASSES.CARD);
    element.type = 'button';

    const content = renderContent(card);

    element.appendChild(content);
    element.addEventListener('click', () => onClick(card.uid));

    function renderContent(card) {
      const content = document.createElement('span');
      content.classList.add(CARD_CLASSES.CONTENT);

      const imgFront = document.createElement('img');
      imgFront.classList.add(CARD_CLASSES.IMG, CARD_CLASSES.IMG_FRONT);
      imgFront.src = card.image;
      imgFront.alt = '';
      imgFront.setAttribute('aria-hidden', 'true');

      const imgBack = document.createElement('img');
      imgBack.classList.add(CARD_CLASSES.IMG, CARD_CLASSES.IMG_BACK);
      imgBack.src = BACK_IMG_PATH;
      imgBack.alt = '';
      imgBack.setAttribute('aria-hidden', 'true');

      content.append(imgFront, imgBack);
      return content;
    }

    function update(card) {
      const isClosed = card.status === CARD_STATUS.CLOSED;
      const label = isClosed
        ? `Карточка ${position}, закрыта`
        : `Карточка ${position}, ${card.name}`;

      element.dataset.state = card.status;
      element.setAttribute('aria-label', label);
      element.setAttribute('aria-disabled', String(!isClosed));
      // element.disabled = !isClosed;

      if (card.fate) {
        element.dataset.fate = card.fate;
      } else {
        delete element.dataset.fate;
      }
    }

    update(card);

    return {
      element,
      update
    };
}