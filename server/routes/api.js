const express = require('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const { validateBoard } = require("../validators/validators");
const { validateList } = require("../validators/validators");
const { validateCard } = require("../validators/validators");

router.get('/boards/:id', boardsController.getBoard);
router.get('/boards', boardsController.getBoards);

router.post('/boards', validateBoard, boardsController.createBoard);

router.post('/lists', validateList, listsController.createList, boardsController.addListToBoard);
router.put('/lists/:id', validateList, listsController.updateList);

router.post('/cards', validateCard, cardsController.createCard, listsController.addCardToList);

module.exports = router;