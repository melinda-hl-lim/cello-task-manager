export const BOARDS_INDEX_URL = "/api/boards";
export const CREATE_BOARD_URL = "/api/boards";
export const CREATE_LIST_URL = "/api/lists";
export const CREATE_CARD_URL = "/api/cards";

export const getBoardUrl = (id) => {
  return `/api/boards/${id}`;
}

export const updateListUrl = (id) => {
  return `/api/lists/${id}`;
}

export const getCardUrl = (id) => {
  return `/api/boards/${id}`
}