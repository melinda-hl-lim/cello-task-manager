const Card = require("../models/card");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createCard = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {
    Card.create(req.body)
      .then((card) => {
        Card.findById(card.id).then(card => {
        req.card = card;
          next();
        })
      })
      .catch(err =>
        next(new HttpError("Creating card failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The card title is empty.", 404));
  }
}

exports.createCard = createCard;