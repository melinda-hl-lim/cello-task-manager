import * as types from "../constants/ActionTypes";

const extractCards = (list) => {
    const {cards, ...listWithoutCards} = list;
    return listWithoutCards;
}

const extractLists = (board) => {
  return board.lists.map(extractCards)
}


export default function lists(state = [], {type, payload }) {
  switch(type) {
    case types.FETCH_BOARD_REQUEST:
      return [];
    case types.FETCH_BOARD_SUCCESS:
      return extractLists(payload.board)
    case types.CREATE_LIST_SUCCESS:
      return [...state, extractCards(payload.list)]
    default:
      return state;
  }
}