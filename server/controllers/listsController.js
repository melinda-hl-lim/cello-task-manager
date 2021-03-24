const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createList = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {
    List.create(req.body)
      .then((list) => {
        List.findById(list.id).then(list => res.json({ list }))
      })
      .catch(err => 
        next(new HttpError("Creating list failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The list title is empty.", 404));
  }
}

exports.createList = createList;