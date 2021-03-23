export default function boards(state = [], { type, payload }) {
  switch (type) {
    case "FETCH_BOARDS_SUCCESS": {
      return payload.boards;
    }
    case "CREATE_BOARD_SUCCESS": {
      const newBoard = payload.board;
      return state.concat(newBoard);
    }
    default:
      return state;
  }
}
