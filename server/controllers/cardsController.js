const Card = require("../models/card");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const Comment = require("../models/comment");
const Action = require("../models/action");

const getCard = (req, res, next) => {
  const id = req.params.id;
  Card.findById(id)
    .populate(["comments", "actions"])
    .then((card) => {
      res.json({ card });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).end();
    });
};

const createCard = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {
    Card.create(req.body)
      .then((card) => {
        Card.findById(card.id).then((card) => {
          req.card = card;
          next();
        });
      })
      .catch((err) =>
        next(new HttpError("Creating card failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The card title is empty.", 404));
  }
};

const updateCard = (req, res, next) => {
  const errors = validationResult(req);
        console.log('req.body: ', req.body);

  if (errors.isEmpty()) {
    Card.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate(["comments", "actions"])
    .then(
      (updatedCard) => {
        res.json({ card: updatedCard });
      }
    );
  } else {
    return next(new HttpError("The card title is empty.", 404));
  }
};

const addCommentToCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.body.cardId,
    { $addToSet: { comments: req.comment.id } },
    { new: true }
  )
    .then((updatedCard) => res.json({ comment: req.comment }))
    .catch((err) => next(new HttpError("Could not add card to list", 500)));
};

exports.addCommentToCard = addCommentToCard;
exports.getCard = getCard;
exports.createCard = createCard;
exports.updateCard = updateCard;
