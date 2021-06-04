import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function fetchBoardsRequest() {
  return { type: types.FETCH_BOARDS_REQUEST };
}

export function fetchBoardsSuccess(boards) {
  return { type: types.FETCH_BOARDS_SUCCESS, payload: { boards } };
}

export function createBoardRequest() {
  return { type: types.CREATE_BOARD_REQUEST };
}

export function createBoardSuccess(board) {
  return { type: types.CREATE_BOARD_SUCCESS, payload: { board } };
}

export function fetchBoards(callback) {
  return function (dispatch) {
    dispatch(fetchBoardsRequest());
    apiClient.getBoards((data) => {
      dispatch(fetchBoardsSuccess(data.boards));

      if (callback) {
        callback(data.boards);
      }
    });
  };
}

export function createBoard(board, callback) {
  return function (dispatch) {
    dispatch(createBoardRequest());
    apiClient.createBoard(board, (data) => {
      dispatch(createBoardSuccess(data.board));

      if (callback) {
        callback(data.board);
      }
    });
  };
}

export function fetchBoardRequest() {
  return { type: types.FETCH_BOARD_REQUEST };
}

export function fetchBoardSuccess(board) {
  return { type: types.FETCH_BOARD_SUCCESS, payload: { board } };
}

export function clearBoard() {
  return { type: types.CLEAR_BOARD };
}

export function fetchBoard(id, callback) {
  return function (dispatch) {
    dispatch(fetchBoardRequest());
    apiClient.getBoard(id, (data) => {
      dispatch(fetchBoardSuccess(data.board));

      if (callback) {
        callback(data.board);
      }
    });
  };
}
