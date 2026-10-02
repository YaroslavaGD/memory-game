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
  ALL_PAIRS: 'Вы нашли все пары за',
  MOVES: 'Ходов:',
  NEW_GAME: 'Новая игра',
  CLOSE: 'Закрыть'
};

function createButton(text, onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add(WIN_CLASSES.BUTTON);
  button.textContent = text;
  button.addEventListener('click', onClick);

  return button;
}

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
  movesText.textContent = `${TEXT.MOVES}: ${moves}`;

  const actions = document.createElement('div');
  actions.classList.add(WIN_CLASSES.ACTIONS);
  actions.append(
    createButton(TEXT.NEW_GAME, onNewGame),
    createButton(TEXT.CLOSE, onClose),
  );

  wrap.append(title, image, description, movesText, actions);

  return wrap;
}