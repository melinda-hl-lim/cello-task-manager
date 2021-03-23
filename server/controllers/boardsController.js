const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt")
    .then(boards => {
      res.json({
        boards,
      })
    })
};

const getBoard = (req, res, next) => {
  Board.findById(req.params.id)
    .populate('lists', {
      id: 1,
      title: 1,
      boardId: 1,
      createdAt: 1,
      updatedAt: 1,
      position: 1,
      cards: 1,
    })
    .populate('lists.cards', {
      id: 1,
      title: 1,
      dueDate: 1,
      labels: 1,
      description: 1,
      listId: 1,
      boardId: 1,
      position: 1,
    })
    .then((board) => {

    })
}

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body)
      .then((board) => {
        Board.find({ _id: board._id }, "title _id createdAt updatedAt").then(board => res.json({ board }))
      })
      .catch(err =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.getBoards = getBoards;
exports.getBoard = getBoard;
exports.createBoard = createBoard;
