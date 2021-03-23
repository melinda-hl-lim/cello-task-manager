import * as types from "../constants/ActionTypes";

export default function board(state = null, { type, payload }) {
  switch(type) {
    case types.FETCH_BOARD_SUCCESS: {
      const { lists, ...boardWithoutLists } = payload.board;
      return boardWithoutLists;
    }
    case types.FETCH_BOARD_REQUEST: {
      return null;
    }
    default: return state;
  }
}