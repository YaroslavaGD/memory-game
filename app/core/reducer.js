import { ACTION_TYPES, GAME_STATUS } from "./constants.js";

export function createInitialState(deck) {
  return {
    cards: deck,
    moves: 0,
    matchedPairs: 0,
    gameStatus: GAME_STATUS.PLAYING,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.NEW_GAME:
      return createInitialState(action.deck);

    default:
      return state;
  }
}