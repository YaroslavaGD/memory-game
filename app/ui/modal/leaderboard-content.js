import { COMMON_TEXT } from "../../core/constants.js";
import { formatDate } from "../fromatDate.js";
import { createButton } from "../common/button.js";

const LEADERBOARD_CLASSES = {
  WRAP: 'leaderboard',
  TITLE: 'leaderboard__title',
  EMPTY: 'leaderboard__empty',
  TABLE: 'leaderboard__table',
  ACTIONS: 'leaderboard__actions',
  BUTTON: 'modal__button',
};

const TEXT = {
  EMPTY: 'Пока нет результатов',
  PLACE: 'Место',
  MOVES: 'Ходы',
  DATE: 'Дата',
};

function createCell(tag, text) {
  const cell = document.createElement(tag);
  cell.textContent = text;
  return cell;
}

function createRow(tag, values) {
  const row = document.createElement('tr');
  row.append(...values.map((value) => createCell(tag, value)));

  return row;
}

function createTable(results) {
  const table = document.createElement('table');
  table.classList.add(LEADERBOARD_CLASSES.TABLE);

  const head = document.createElement('thead');
  const headRow = createRow('th', [TEXT.PLACE, TEXT.MOVES, TEXT.DATE]);
  headRow.querySelectorAll('th').forEach((th) => th.setAttribute('scope', 'col'));
  head.append(headRow);

  const body = document.createElement('tbody');
  results.forEach((result, index) => {
    const tag = 'td'
    const id = index + 1;
    const moves = result.moves;
    const date = formatDate(result.finishedAt)
    body.append(createRow(tag, [id, moves, date]));
  });

  table.append(head, body);
  return table;
}

export function createLeaderboardContent(results, { onClose }) {
  const wrap = document.createElement('div');
  wrap.classList.add(LEADERBOARD_CLASSES.WRAP);

  const title = document.createElement('h2');
  title.classList.add(LEADERBOARD_CLASSES.TITLE);
  title.textContent = COMMON_TEXT.LEADERBOARD;

  let list;
  if (results.length === 0) {
    list = document.createElement('p');
    list.classList.add(LEADERBOARD_CLASSES.EMPTY);
    list.textContent = TEXT.EMPTY;
  } else {
    list = createTable(results);
  }

  const actions = document.createElement('div');
  actions.classList.add(LEADERBOARD_CLASSES.ACTIONS);

  actions.append(createButton(COMMON_TEXT.CLOSE, onClose, LEADERBOARD_CLASSES.BUTTON));

  wrap.append(title, list, actions)
  return wrap;
}