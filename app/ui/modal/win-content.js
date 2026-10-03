import { COMMON_TEXT } from "../../core/constants.js";
import { createButton } from "../common/button.js";

const WIN_CLASSES = {
  WRAP: 'win',
  IMAGE: 'win__img',
  TITLE: 'win__title',
  TEXT: 'win__text',
  ACTIONS: 'win__actions',
  BUTTON: 'modal__button',
};

const TEXT = {
  WIN: 'Принцесса сделала выбор!',
  MOVES: 'Ходов:',
};
export function createWinContent(prince, moves, { onNewGame, onClose }) {
  const wrap = document.createElement('div');
  wrap.classList.add(WIN_CLASSES.WRAP);

  const title = document.createElement('h2');
  title.classList.add(WIN_CLASSES.TITLE);
  title.textContent = TEXT.WIN;

  const image = document.createElement('img');
  image.classList.add(WIN_CLASSES.IMAGE);
  image.src = prince.imageBig;
  image.alt = prince.name;

  const description = document.createElement('p');
  description.classList.add(WIN_CLASSES.TEXT);
  description.textContent = prince.description;

  const movesText = document.createElement('p');
  movesText.classList.add(WIN_CLASSES.TEXT);
  movesText.textContent = `${TEXT.MOVES} ${moves}`;

  const actions = document.createElement('div');
  actions.classList.add(WIN_CLASSES.ACTIONS);
  actions.append(
    createButton(COMMON_TEXT.NEW_GAME, onNewGame, WIN_CLASSES.BUTTON),
    createButton(COMMON_TEXT.CLOSE, onClose, WIN_CLASSES.BUTTON),
  );

  wrap.append(title, image, description, movesText, actions);

  return wrap;
}