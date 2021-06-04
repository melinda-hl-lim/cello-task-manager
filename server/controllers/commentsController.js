const Comment = require("../models/comment");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createComment = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Comment.create(req.body)
      .then((comment) => {
        Comment.findById(comment.id).then((comment) => {
          req.comment = comment;
          next();
        });
      })
      .catch((err) =>
        next(new HttpError("Creating comment failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The comment text is empty.", 404));
  }
};

exports.createComment = createComment;
