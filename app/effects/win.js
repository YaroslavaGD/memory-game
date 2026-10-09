import { saveResult } from "../services/leaderboard-storage.js";
import { isJustWon, selectWinner } from "../core/selectors.js";
import { createWinContent } from "../ui/modal/win-content.js";
import { ACTION_TYPES } from "../core/constants.js";


export function setupLeaderboardSave(store) {
  store.subscribe((state, prev) => {
    if (isJustWon(state, prev)) saveResult(state.moves);
  });
}

export function setupWinModal(store, modal, onNewGame) {
  const WIN_MODAL_DELAY = 1400;
  let timerId = null;
  store.subscribe((state, prev, action) => {
    if (action.type === ACTION_TYPES.NEW_GAME) { 
      clearTimeout(timerId); 
      timerId = null;
    }

    if (!isJustWon(state, prev)) return;
  
    const winner = selectWinner(state);
    const winContent = createWinContent(winner, state.moves, {
      onNewGame: () => {
        modal.close();
        onNewGame();
      },
      onClose: modal.close,
    });

    timerId = setTimeout(() => { 
      modal.open(winContent) 
    }, WIN_MODAL_DELAY);
    // modal.open(winContent);
  });
}