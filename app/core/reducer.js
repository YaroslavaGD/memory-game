import { ACTION_TYPES, CARD_STATUS, GAME_STATUS, PAIRS_COUNT } from "./constants.js";

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

    case ACTION_TYPES.CARD_CLICKED: {
      const clickedCard = state.cards.find((card) => card.uid === action.uid);

      if (state.gameStatus !== GAME_STATUS.PLAYING || 
          !clickedCard || 
          clickedCard.status !== CARD_STATUS.CLOSED) {
        return state;
      }

      const cards = state.cards.map((card) => {
        if (card.uid === clickedCard.uid){
          return { ...card, status: CARD_STATUS.OPEN };
        } 

        return card;
      });

      const openCards = cards.filter((card) => card.status === CARD_STATUS.OPEN);
      if (openCards.length < 2) {
        return { ...state, cards };
      }

      const moves = state.moves + 1;

      //MATCHED
      if (openCards[0].pairId === openCards[1].pairId) {
        const matchedPairs = state.matchedPairs + 1;
        const cardsWithMatched = cards.map((card) =>(
            card.status === CARD_STATUS.OPEN ? { ...card, status: CARD_STATUS.MATCHED } : card
          ));
        const newGameStatus = matchedPairs === PAIRS_COUNT ? GAME_STATUS.WON : GAME_STATUS.PLAYING;

        return {
          ...state,
          cards: cardsWithMatched,
          moves,
          matchedPairs,
          gameStatus: newGameStatus,
        }
      }

      //MISMATCHED --> CHECKING
      return {
        ...state,
        cards,
        moves,
        gameStatus: GAME_STATUS.CHECKING,
      };
    }

    case ACTION_TYPES.MISMATCHED: {
      if (state.gameStatus !== GAME_STATUS.CHECKING) return state;
  
      const closedCards = state.cards.map((card) => {
        if (card.status === CARD_STATUS.OPEN) {
          return {
            ...card,
            status: CARD_STATUS.CLOSED
          };
        }
        return card;
      });
  
      return {
        ...state,
        cards: closedCards,
        gameStatus: GAME_STATUS.PLAYING,
      };
    }

    default:
      return state;
  }
}