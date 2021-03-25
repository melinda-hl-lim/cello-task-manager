import * as types from "../constants/ActionTypes";

const extractCards = (board) => {
  return board.lists.reduce((cards, list) => [...cards, ...list.cards], []);
}

const filterCards = (cards, boardId) => {
  return cards.filter(card => card.boardId !== boardId);
}

export default function cards(state = [], {type, payload }) {
  switch(type) {
    case types.FETCH_BOARD_REQUEST:
      return state;
    case types.FETCH_BOARD_SUCCESS:
      return [...filterCards(state, payload.board.id), ...extractCards(payload.board)]
    default:
      return state;
  }
}