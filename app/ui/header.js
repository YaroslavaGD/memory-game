const HEADER_CLASSES = {
  HEADER: 'header',
  HEADER_BUTTON: 'header__button',
};

const BUTTON_TEXT = {
  NEW_GAME: 'Новая игра',
  LEADERBOARD: 'Таблица лидеров',
};

function createButton(text, onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add(HEADER_CLASSES.HEADER_BUTTON);
  button.textContent = text;
  button.addEventListener('click', onClick);

  return button;
}

export function createHeader({ onNewGame, onLeaderboard }) {
  const element = document.createElement('header');
  element.classList.add(HEADER_CLASSES.HEADER);

  element.appendChild(createButton(BUTTON_TEXT.NEW_GAME, onNewGame));
  element.appendChild(createButton(BUTTON_TEXT.LEADERBOARD, onLeaderboard));

  return { element };
}