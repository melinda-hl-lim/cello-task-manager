import * as types from "../constants/ActionTypes";

const extractCards = (list) => {
  const { cards, ...listWithoutCards } = list;
  listWithoutCards.cards = cards.map((card) => card.id);
  return listWithoutCards;
};

const extractLists = (board) => {
  return board.lists.map(extractCards);
};

const removeListsFromSelectedBoard = (lists, boardId) => {
  return lists.filter((list) => list.boardId !== boardId);
};

export default function lists(state = [], { type, payload }) {
  switch (type) {
    case types.FETCH_BOARD_REQUEST:
      return state;
    case types.FETCH_LISTS_FROM_BOARD_SUCCESS:
    case types.FETCH_BOARD_SUCCESS:
      return [
        ...removeListsFromSelectedBoard(state, payload.board.id),
        ...extractLists(payload.board),
      ];
    case types.CREATE_LIST_SUCCESS:
      return [...state, extractCards(payload.list)];
    case types.UPDATE_LIST_SUCCESS:
      return state
        .filter((list) => list.id !== payload.list.id)
        .concat(payload.list);
    default:
      return state;
  }
}
