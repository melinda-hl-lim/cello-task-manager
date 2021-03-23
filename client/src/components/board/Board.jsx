import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoard } from "../../actions/BoardActions";

const Board = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const board = useSelector((state) => {
    return state.boards.find((board) => board.id === id)
  });

  useEffect(() => {
    dispatch(fetchBoard(id))
  }, [dispatch, id]);
  
  return (
    <div />
  );
}

export default Board;