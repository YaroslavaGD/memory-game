import { COMMON_TEXT } from "../../core/constants.js";
import { createButton } from "../common/button.js";

const HEADER_CLASSES = {
  HEADER: 'header',
  HEADER_BUTTON: 'header__button',
};

export function createHeader({ onNewGame, onLeaderboard }) {
  const element = document.createElement('header');
  element.classList.add(HEADER_CLASSES.HEADER);

  element.appendChild(createButton(COMMON_TEXT.NEW_GAME, onNewGame, HEADER_CLASSES.HEADER_BUTTON));
  element.appendChild(createButton(COMMON_TEXT.LEADERBOARD, onLeaderboard, HEADER_CLASSES.HEADER_BUTTON));

  return { element };
}