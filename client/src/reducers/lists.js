import * as types from "../constants/ActionTypes";

const extractLists = (board) => {
  const listsWithoutCards = board.lists.map(list => {
    const {cards, ...listWithoutCards} = list;
    return listWithoutCards;
  })
  return listsWithoutCards;
}

export default function lists(state = [], {type, payload }) {
  switch(type) {
    case types.FETCH_BOARD_REQUEST:
      return [];
    case types.FETCH_BOARD_SUCCESS:
      return extractLists(payload.board)
    default:
      return state;
  }
}