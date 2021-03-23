import * as types from "../constants/ActionTypes";

export default function board(state = null, { type, payload }) {
  switch(type) {
    case types.FETCH_BOARD_SUCCESS: {
      return payload.board;
    }
    case types.CLEAR_BOARD: {
      return null;
    }
    default: return state;
  }
}