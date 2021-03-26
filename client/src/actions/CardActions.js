import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createCardRequest() {
  return { type: types.CREATE_CARD_REQUEST }
}

export function createCardSuccess(card) {
  return { type: types.CREATE_CARD_SUCCESS, payload: { card } };
}

export function createCard(cardTitle, listId, boardId, callback) {
  return function(dispatch) {
    dispatch(createCardRequest());
    apiClient.createCard(cardTitle, listId, boardId, (card) => {
      dispatch(createCardSuccess(card));

      if (callback) {
        callback(card);
      }
    })
  }
}