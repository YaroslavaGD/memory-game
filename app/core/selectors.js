import { CARDS_DATA } from "../cards-data.js";

const getPrince = (id) => CARDS_DATA.find((prince) => prince.id === id) ?? null;

export const selectWinner = (state) => getPrince(state.winnerId);

export const selectLastEaten = (state) => {
  const id = state.eatenIds.at(-1);
  return id === undefined ? null : getPrince(id);
};