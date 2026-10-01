const CARD_CLASSES = {
  CARD: 'card',
  CARD_OPEN: 'card--open',
  CONTENT: 'card__content',
  IMG: 'card__img',
  IMG_FRONT: 'card__img--front',
  IMG_BACK: 'card__img--back',
};

const BACK_IMG_PATH = 'assets/ui/card_cover-2x.png';
const FRONT_IMG_PATH_BASE = 'assets/monsters/big';
const IMG_FORMAT = 'png';

function createCard() {
  function init(index) {
    const cardElement = document.createElement('button');
    cardElement.classList.add(CARD_CLASSES.CARD, CARD_CLASSES.CARD_OPEN);
    cardElement.type = 'button';

    cardElement.appendChild(renderContent(index));

    return cardElement;
  }

  function renderContent(index) {
    const content = document.createElement('span');
    content.classList.add(CARD_CLASSES.CONTENT);

    const imgFront = document.createElement('img');
    imgFront.classList.add(CARD_CLASSES.IMG, CARD_CLASSES.IMG_FRONT);
    imgFront.src = `${FRONT_IMG_PATH_BASE}/${index}.${IMG_FORMAT}`;

    const imgBack = document.createElement('img');
    imgBack.classList.add(CARD_CLASSES.IMG, CARD_CLASSES.IMG_BACK);
    imgBack.src = BACK_IMG_PATH;

    content.append(imgFront, imgBack);
    return content;
  }
  
  return {
    init,
  }
}

export const card = createCard();
