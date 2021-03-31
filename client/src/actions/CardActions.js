import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";
import { Callbacks } from "jquery";

export function createCardRequest() {
  return { type: types.CREATE_CARD_REQUEST };
}

export function createCardSuccess(card) {
  return { type: types.CREATE_CARD_SUCCESS, payload: { card } };
}

export function createCard(cardTitle, listId, boardId, callback) {
  return function (dispatch) {
    dispatch(createCardRequest());
    apiClient.createCard(cardTitle, listId, boardId, ({ card }) => {
      dispatch(createCardSuccess(card));

      if (callback) {
        callback(card);
      }
    });
  };
}

export function fetchCardRequest() {
  return { type: types.FETCH_CARD_REQUEST };
}
export function fetchCardSuccess(card) {
  return { type: types.FETCH_CARD_SUCCESS, payload: { card } };
}

export function fetchCard(id, callback) {
  return function (dispatch) {
    dispatch(fetchCardRequest());
    apiClient.fetchCard(id, ({ card }) => {
      dispatch(fetchCardSuccess(card));
      if (callback) {
        callback(card);
      }
    });
  };
}
export function updateCardRequest() {
  return { type: types.UPDATE_CARD_REQUEST };
}
export function updateCardSuccess(card) {
  return { type: types.UPDATE_CARD_SUCCESS, payload: { card } };
}

export function updateCard(card, callback) {
  return function (dispatch) {
    dispatch(updateCardRequest());
    apiClient.updateCard(card, ({ card: updatedCard }) => {
      dispatch(updateCardSuccess(updatedCard));
      if (callback) {
        callback(updatedCard);
      }
    });
  };
}

export function toggleCardLabelRequest(card) {
  return { type: types.TOGGLE_CARD_LABEL_REQUEST, payload: { card } };
}

export function toggleCardLabel(card, label, callback) {
  return function (dispatch) {

    const toggleLabel = (label) => {
      if (card.labels.includes(label)) {
        return card.labels.filter((l) => l !== label);
      } else {
        return card.labels.concat(label);
      }
    }

    const newCard = {...card, labels: toggleLabel(label)};

    dispatch(toggleCardLabelRequest(newCard));
    apiClient.updateCard(newCard, ({ card: updatedCard }) => {
      dispatch(updateCardSuccess(updatedCard));
      
      if (callback) {
        callback(updatedCard);
      }
    })
  }
}

export function createCommentRequest() {
  return { type: types.CREATE_COMMENT_REQUEST };
}
export function createCommentSuccess(comment) {
  return { type: types.CREATE_COMMENT_SUCCESS, payload: { comment } };
}
export function createComment(cardId, commentText, callback) {
  return function (dispatch) {
    dispatch(createCommentRequest());
    apiClient.createComment(cardId, commentText, ({ comment }) => {
      dispatch(createCommentSuccess(comment));
      if (callback) {
        callback(comment);
      }
    });
  };
}
