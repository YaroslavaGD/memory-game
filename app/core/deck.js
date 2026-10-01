import { CARD_STATUS } from "./constants.js";
import { shuffle } from "./shuffle.js"
export function buildDeck(cards) {
  const cardPairs = cards.flatMap((card) => [
    { pairId: card.id, image: card.image, name: card.name },
    { pairId: card.id, image: card.image, name: card.name },
  ]);

  return shuffle(cardPairs).map((card, index) => ({
    ...card,
    uid: index,
    status: CARD_STATUS.CLOSED,
  }));
}