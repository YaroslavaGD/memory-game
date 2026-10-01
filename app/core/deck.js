import { CARD_STATUS } from "./constants.js";
import { shuffle } from "./shuffle.js"

let deckCounter = 0;
export function buildDeck(cards) {
  const cardPairs = cards.flatMap((card) => [
    { pairId: card.id, image: card.image, name: card.name },
    { pairId: card.id, image: card.image, name: card.name },
  ]);
  
  deckCounter += 1;
  return shuffle(cardPairs).map((card, index) => ({
    ...card,
    uid: `${deckCounter}-${index}`,
    status: CARD_STATUS.CLOSED,
  }));
}