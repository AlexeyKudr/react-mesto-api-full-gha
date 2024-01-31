const { CastError } = require('mongoose').Error;
const card = require('../models/card');
const { OK } = require('../utils/const');
const BadRequestError = require('../middlewars/BadRequestError');
const NotFoundError = require('../middlewars/NotFoundError');
const ForbiddenError = require('../middlewars/ForbiddenError');

const getCards = async (req, res, next) => {
  try {
    const newCard = await card.find({});
    res
      .status(OK)
      .send(newCard);
  } catch (error) {
    next(error);
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const newCard = await card.create({ name, link, owner });
    return res.status(OK).send({
      _id: newCard._id,
      name: newCard.name,
      link: newCard.link,
      owner: newCard.owner,
      likes: newCard.likes,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new BadRequestError(error.message));
    }
    return next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const Card = await card.findById(req.params.cardId)
      .orFail(() => next(new NotFoundError('Карточка не найдена')));
    if (Card.owner.toString() !== req.user._id) {
      return next(new ForbiddenError('Недостаточно прав для удаления'));
    }
    await Card.deleteOne(req.params);
    return res
      .status(OK)
      .send({ message: 'Карточка успешно удалена' });
  } catch (error) {
    if (error instanceof CastError) {
      return next(new BadRequestError('Некорректный ID карточки'));
    }
    return next(error);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const Card = await card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!Card) {
      return next(new NotFoundError('Карточка не найдена'));
    }
    return res.status(OK).send(Card);
  } catch (error) {
    if (error instanceof CastError) {
      return next(new BadRequestError('Некорректный ID карточки'));
    }
    return next(error);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const Card = await card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!Card) {
      return next(new NotFoundError('Карточка не найдена'));
    }
    return res
      .status(OK)
      .send(Card);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
