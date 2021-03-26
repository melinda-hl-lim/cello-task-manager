const {check} = require('express-validator');

exports.validateBoard = [check("title").not().isEmpty()];
exports.validateList = [check("title").not().isEmpty()];
exports.validateCard = [check("title").not().isEmpty()];