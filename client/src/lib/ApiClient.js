import axios from "axios";
import * as routes from "../constants/ApiRoutes";

function logError(errorResponse) {
  const response = errorResponse.response;

  if (response && response.data && response.data.error) {
    // eslint-disable-next-line no-console
    console.error(`HTTP Error: ${response.data.error}`);
  } else {
    // eslint-disable-next-line no-console
    console.error("Error: ", errorResponse);
  }
}

function unwrapData(response) {
  return response.data;
}

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json";

const apiClient = {
  getBoards: function (callback) {
    return axios
      .get(routes.BOARDS_INDEX_URL)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createBoard: function (board, callback) {
    return axios
      .post(routes.CREATE_BOARD_URL, board)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getBoard: function (id, callback) {
    return axios
      .get(routes.getBoardUrl(id))
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createList: function (listTitle, boardId, callback) {
    return axios
      .post(routes.CREATE_LIST_URL, {
        boardId: boardId,
        title: listTitle,
      })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  updateList: function (list, callback) {
    return axios
      .put(routes.updateListUrl(list.id), {
        title: list.title,
        position: list.position,
      })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  updateCard: function (card, callback) {
    return axios
      .put(routes.updateCardUrl(card.id), card)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createCard: function (cardTitle, listId, boardId, callback) {
    return axios
      .post(routes.CREATE_CARD_URL, {
        boardId: boardId,
        listId: listId,
        title: cardTitle,
      })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  fetchCard: function (id, callback) {
    return axios
      .get(routes.getCardUrl(id))
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createComment: function (cardId, text, callback) {
    return axios
      .post(routes.CREATE_COMMENT_URL, {
        cardId,
        text,
      })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
};

export default apiClient;
