import { saveResult } from "../services/leaderboard-storage.js";
import { isJustWon, selectWinner } from "../core/selectors.js";
import { createWinContent } from "../ui/modal/win-content.js";


export function setupLeaderboardSave(store) {
  store.subscribe((state, prev) => {
    if (isJustWon(state, prev)) saveResult(state.moves);
  });
}

export function setupWinModal(store, modal, onNewGame) {
  store.subscribe((state, prev) => {
    if (!isJustWon(state, prev)) return;
  
    const winner = selectWinner(state);
    const winContent = createWinContent(winner, state.moves, {
      onNewGame: () => {
        modal.close();
        onNewGame();
      },
      onClose: modal.close,
    });
  
    modal.open(winContent);
  });
}