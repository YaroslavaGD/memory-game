import { ACTION_TYPES, GAME_STATUS } from "./constants.js";

export function initTimer(store, delay = 700){
  let timerId = null;

  store.subscribe((state, prev, action) => {
    if (action.type === ACTION_TYPES.NEW_GAME) {
      clearTimeout(timerId);
      timerId = null;
    }

    if (state.gameStatus === GAME_STATUS.CHECKING && timerId === null) {
      timerId = setTimeout(() => {
        timerId = null;
        store.dispatch({ type: ACTION_TYPES.MISMATCHED });
      }, delay);
    }
  });
}