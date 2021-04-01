import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardLocationForm from "./CardLocationForm";
import * as boardActions from "../../actions/BoardActions";

const CardLocationFormContainer = (props) => {
  const [selectedBoard, setSelectedBoard] = useState(undefined);
  const [first, setFirst] = useState(true);

  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(undefined);
  const [selectedList, setSelectedList] = useState(undefined);
  const [boardsFetched, setBoardsFetched] = useState(false);

  const stateBoards = useSelector((state) => state.boards);
  const stateLists = useSelector((state) => state.lists);
  const stateCards = useSelector((state) => state.cards);

  const propsBoards = stateBoards;

  const propsLists = stateLists.filter((list) => list.boardId === props.card.boardId);

  const [lists, setLists] = useState(propsLists);

  const propsCards = stateCards.filter(
    (card) => !card.archived && card.listId === props.card.listId
  );

  const dispatch = useDispatch();

  const fetchBoard = useCallback(
    (id, callback) => {
      dispatch(boardActions.fetchBoard(id, callback));
    },
    [dispatch]
  );

  const fetchBoards = useCallback(
    (callback) => {
      dispatch(boardActions.fetchBoards(callback));
    },
    [dispatch]
  );

  const currentCardPositionIndex = useCallback(() => {
    const cards = propsCards;
    let currentPosition = cards.findIndex(
      (card) => card.id === props.card.id
    );
    if (currentPosition === -1) currentPosition = undefined;

    return currentPosition;
  }, [props.card.id, propsCards]);

  const selectBoard = useCallback(
    (id) => {
      fetchBoard(id, (board) => {
        const newLists = board.lists;

        setSelectedBoard(board);
        setLists(newLists);
        setFirst(true);
      });
    },
    [fetchBoard]
  );

  const selectPosition = useCallback(
    (position) => {
      if (position === "bottom") {
        position = positions[positions.length - 1];
      }

      if (position != null) {
        setSelectedPosition(position);
      } else {
        setSelectedPosition(positions[0]);
      }
    },
    [positions]
  );

  useEffect(() => {
    const boardIdLocation = selectedBoard && selectedBoard.id;
    const listIdLocation = selectedList && selectedList.id;
    const positionLocation = selectedPosition;
    props.onLocationChange(boardIdLocation, listIdLocation, positionLocation);
  }, [selectedBoard, selectedList, selectedPosition, props]);

  const selectList = useCallback(
    (id) => {
      let list;
      const positions = [];
      if (id) {
        list = lists.find((list) => list.id === id);
      } else {
        list = lists[0];
      }

      if (list) {
        const cards = stateCards.filter(
    (card) => !card.archived && card.listId === list.id
  );
        let currentPosition = cards.findIndex(
          (card) => card.id === props.card.id
        );
        if (currentPosition === -1) currentPosition = undefined;

        let potentialPositionsLength;

        if (currentPosition === undefined || props.mode === "copy") {
          potentialPositionsLength = cards.length + 1;
        } else {
          potentialPositionsLength = cards.length;
        }

        for (let i = 0; i < potentialPositionsLength; i++) {
          positions.push(i);
        }
      }
      setSelectedList(list);
      setPositions(positions);
    },
    [lists, props.card.id, props.mode, stateCards]
  );

  useEffect(() => {
    if (selectedBoard && selectedList) {
      if (
        selectedBoard.id === props.card.boardId &&
        selectedList.id === props.card.listId &&
        props.mode !== "copy"
      ) {
        selectPosition(currentCardPositionIndex());
      } else {
        selectPosition("bottom");
      }
    }
  }, [
    selectedBoard,
    selectedList,
    currentCardPositionIndex,
    props.card.boardId,
    props.card.listId,
    props.mode,
    selectPosition,
  ]);

  useEffect(() => {
    if (selectedBoard) {
      if (selectedBoard.id === props.card.boardId) {
        selectList(props.card.listId);
        setFirst(false);
      } else if (lists.length) {
        selectList(lists[0].id);
        setFirst(false);
      } else {
        selectList();
        setFirst(false);
      }
    }
  }, [props.card.boardId, selectedBoard, lists, selectList, props.card.listId]);

  useEffect(() => {
    if (first) {
      selectList(props.card.listId);
    }
  }, [props.card.listId, selectList, first]);

  useEffect(() => {
    if (boardsFetched) {
      return;
    }
    fetchBoards();
    setSelectedBoard(
      propsBoards.find((board) => {
        return board.id === props.card.boardId;
      })
    );
    setSelectedPosition(currentCardPositionIndex());
    setBoardsFetched(true);
  }, [
    fetchBoards,
    propsBoards,
    currentCardPositionIndex,
    props.card.boardId,
    boardsFetched,
  ]);

  const handleBoardChange = useCallback(
    (e) => {
      const selectedValue = e.target.value;
      selectBoard(selectedValue);
    },
    [selectBoard]
  );

  const handleListChange = useCallback(
    (e) => {
      const selectedValue = e.target.value;
      selectList(selectedValue);
    },
    [selectList]
  );

  const handlePositionChange = useCallback(
    (e) => {
      const selectedValue = +e.target.value;

      selectPosition(selectedValue);
    },
    [selectPosition]
  );

  const selectedPositionHumanIndex = useCallback(() => {
    if (selectedPosition == null) {
      return "N/A";
    } else {
      return selectedPosition + 1;
    }
  }, [selectedPosition]);

  const selectedBoardTitle = useCallback(() => {
    if (selectedBoard) {
      return selectedBoard.title;
    } else {
      return "No Boards";
    }
  }, [selectedBoard]);

  const selectedBoardId = useCallback(() => {
    if (selectedBoard) {
      return selectedBoard.id;
    } else {
      return undefined;
    }
  }, [selectedBoard]);

  const selectedListTitle = useCallback(() => {
    if (selectedList) {
      return selectedList.title;
    } else {
      return "No Lists";
    }
  }, [selectedList]);

  const selectedListId = useCallback(() => {
    if (selectedList) {
      return selectedList.id;
    } else {
      return undefined;
    }
  }, [selectedList]);

  const isSubmitDisabled = useCallback(() => {
    return (
      selectedBoard == null || selectedList == null || selectedPosition == null
    );
  }, [selectedBoard, selectedList, selectedPosition]);

  return (
    <CardLocationForm
      boards={propsBoards}
      lists={lists}
      positions={positions}
      selectedBoardId={selectedBoardId()}
      selectedBoardTitle={selectedBoardTitle()}
      selectedListId={selectedListId()}
      selectedListTitle={selectedListTitle()}
      selectedPosition={selectedPosition}
      currentPosition={currentCardPositionIndex()}
      selectedPositionHumanIndex={selectedPositionHumanIndex()}
      onPositionChange={handlePositionChange}
      currentBoardId={props.card.boardId}
      currentListId={props.card.listId}
      onBoardChange={handleBoardChange}
      onListChange={handleListChange}
      isSubmitDisabled={isSubmitDisabled()}
    />
  );
};

export default CardLocationFormContainer;
