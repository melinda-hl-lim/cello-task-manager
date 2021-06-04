const Board = require("../models/board");
const List = require("../models/list");
const Card = require("../models/card");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt").then((boards) => {
    res.json({
      boards,
    });
  });
};

const getBoard = (req, res, next) => {
  Board.findById(req.params.id)
    .populate({
      path: "lists",
      populate: {
        path: "cards",
        select: [
          "description",
          "id",
          "title",
          "boardId",
          "position",
          "dueDate",
          "labels",
          "listId",
          "comments",
          "commentCount",
        ],
      },
    })
    .then((board) => {
      res.json({
        board,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).end();
    });
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body)
      .then((board) => {
        Board.find(
          { _id: board._id },
          "title _id createdAt updatedAt"
        ).then((board) => res.json({ board }));
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const addListToBoard = (req, res, next) => {
  Board.findByIdAndUpdate(
    req.body.boardId,
    { $addToSet: { lists: req.list.id } },
    { new: true }
  )
    .then((updatedBoard) => res.json({ list: req.list }))
    .catch((err) => next(new HttpError("Could not add list to board", 500)));
};

exports.getBoards = getBoards;
exports.getBoard = getBoard;
exports.createBoard = createBoard;
exports.addListToBoard = addListToBoard;
