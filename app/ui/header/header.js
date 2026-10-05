import { COMMON_TEXT } from "../../core/constants.js";
import { createButton } from "../common/button.js";

const HEADER_CLASSES = {
  HEADER: 'header',
  GROUP: 'header__group',
  // HEADER_BUTTON: 'header__button',
  BUTTON: 'button button--ghost',
};

export function createHeader({ onNewGame, onLeaderboard, volume }) {
  const element = document.createElement('header');
  element.classList.add(HEADER_CLASSES.HEADER);

  const group = document.createElement('div');
  group.classList.add(HEADER_CLASSES.GROUP);
  group.append(
    createButton(COMMON_TEXT.LEADERBOARD, onLeaderboard, HEADER_CLASSES.BUTTON),
    volume,
  );

  element.append(
    createButton(COMMON_TEXT.NEW_GAME, onNewGame, HEADER_CLASSES.BUTTON),
    group,
  );
  // element.appendChild(createButton(COMMON_TEXT.NEW_GAME, onNewGame, HEADER_CLASSES.HEADER_BUTTON));
  // element.appendChild(createButton(COMMON_TEXT.LEADERBOARD, onLeaderboard, HEADER_CLASSES.HEADER_BUTTON));

  return { element };
}