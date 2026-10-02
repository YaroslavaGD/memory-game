import { CARD_STATUS } from "./constants.js";
import { shuffle } from "./shuffle.js"

let deckCounter = 0;
export function buildCards(princes) {
  const cardPairs = princes.flatMap((prince) => [
    { pairId: prince.id, image: prince.image, name: prince.name },
    { pairId: prince.id, image: prince.image, name: prince.name },
  ]);
  
  deckCounter += 1;
  return shuffle(cardPairs).map((card, index) => ({
    ...card,
    uid: `${deckCounter}-${index}`,
    status: CARD_STATUS.CLOSED,
  }));
}