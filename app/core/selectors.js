import { PRINCES } from "../princes-data.js";
import { GAME_STATUS } from "./constants.js";

const getPrince = (id) => PRINCES.find((prince) => prince.id === id) ?? null;

export const selectWinner = (state) => getPrince(state.winnerId);

export const selectLastEaten = (state) => {
  const id = state.eatenIds.at(-1);
  return id === undefined ? null : getPrince(id);
};

export const isJustWon = (state, prev) => prev.gameStatus !== GAME_STATUS.WON && state.gameStatus === GAME_STATUS.WON;