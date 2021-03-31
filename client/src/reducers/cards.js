import * as types from "../constants/ActionTypes";

const extractCards = (board) => {
  return board.lists.reduce((cards, list) => [...cards, ...list.cards], []);
};

const filterCards = (cards, boardId) => {
  return cards.filter((card) => card.boardId !== boardId);
};

const filterCardsByCardId = (cards, cardId) => {
  return cards.filter((card) => card.id !== cardId);
};

export default function cards(state = [], { type, payload }) {
  switch (type) {
    case types.FETCH_BOARD_REQUEST:
      return state;
    case types.FETCH_BOARD_SUCCESS:
      return [
        ...filterCards(state, payload.board.id),
        ...extractCards(payload.board),
      ];
    case types.CREATE_CARD_REQUEST:
      return state;
    case types.CREATE_CARD_SUCCESS:
      // console.log(payload);
      return [...state, payload.card];
    case types.FETCH_CARD_SUCCESS:
      return [...filterCardsByCardId(state, payload.card.id), payload.card];
    case types.FETCH_CARD_REQUEST:
      return state;
    case types.CREATE_COMMENT_SUCCESS:
      return state.map((card) => {
        if (card.id === payload.comment.cardId) {
          return {
            ...card,
            comments: [...card.comments, payload.comment],
          };
        } else {
          return card;
        }
      });
    case types.TOGGLE_CARD_LABEL_REQUEST:
      // Expects this case to fall through to UPDATE_CARD_SUCCESS
      
    // eslint-disable-next-line no-fallthrough
    case types.UPDATE_CARD_SUCCESS:
      return state
        .filter((card) => card.id !== payload.card.id)
        .concat(payload.card);
    default:
      return state;
  }
}
