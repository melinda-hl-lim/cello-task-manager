import * as types from "../constants/ActionTypes";

const extractCards = (board) => {
  return board.lists.reduce((cards, list) => [...cards, ...list.cards], []);
}

export default function cards(state = [], {type, payload }) {
  switch(type) {
    case types.FETCH_BOARD_REQUEST:
      return [];
    case types.FETCH_BOARD_SUCCESS:
      return extractCards(payload.board)
    default:
      return state;
  }
}