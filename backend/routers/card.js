const express = require('express');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cardControllers');
const { createCardValid, cardValid } = require('../middlewars/validations');

const cardRouter = express.Router();

cardRouter.get('/', getCards);
cardRouter.post('/', createCardValid, createCard);
cardRouter.delete('/:cardId', cardValid, deleteCard);
cardRouter.put('/:cardId/likes', cardValid, likeCard);
cardRouter.delete('/:cardId/likes', cardValid, dislikeCard);

module.exports = cardRouter;
