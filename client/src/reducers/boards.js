import * as types from "../constants/ActionTypes";

const filterBoards = (boards, boardId) => {
  return boards.filter(board => board.id !== boardId);
}

const extractLists = (board) => {
  const { lists, ...boardWithoutLists } = board;
  return boardWithoutLists;
}

export default function boards(state = [], { type, payload }) {
  switch (type) {
    case types.FETCH_BOARDS_SUCCESS: {
      return payload.boards;
    }
    case types.CREATE_BOARD_SUCCESS: {
      const newBoard = payload.board;
      return state.concat(newBoard);
    }
    case types.FETCH_BOARD_SUCCESS: {
      return filterBoards(state, payload.board.id).concat(extractLists(payload.board))
    } 
    default:
      return state;
  }
}
