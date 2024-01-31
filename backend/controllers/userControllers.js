const { CastError } = require('mongoose').Error;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { OK, MONGO_DUPLICATE_ERROR_CODE } = require('../utils/const');
const BadRequestError = require('../middlewars/BadRequestError');
const DuplicateError = require('../middlewars/DuplicateError');
const UnAuthorized = require('../middlewars/Unauthorized');
const NotFoundError = require('../middlewars/NotFoundError');

const getUsers = async (req, res, next) => {
  try {
    const Users = await user.find({});
    res
      .status(OK)
      .send(Users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const User = await user.findById(userId);
    if (!User) {
      return next(new NotFoundError('Пользователь не найден'));
    }
    return res.status(OK).send(User);
  } catch (error) {
    if (error instanceof CastError) {
      return next(new BadRequestError('Передан невалидный id'));
    }
    return next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = await user.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    });
    return res
      .status(201)
      .send({
        email: newUser.email,
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
      });
  } catch (error) {
    if (error.code === MONGO_DUPLICATE_ERROR_CODE) {
      return next(new DuplicateError('Такой email уже существует'));
    }
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const UpdateUser = await user.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true, runValidators: true },
    ).orFail(new Error('Запрашиваемый пользователь не найден'));
    return res
      .status(OK)
      .json(UpdateUser);
  } catch (error) {
    return next(error);
  }
};

// eslint-disable-next-line consistent-return
const updateAvatar = async (req, res, next) => {
  try {
    const UpdateUser = await user.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true, runValidators: true },
    ).orFail(new Error('Запрашиваемый пользователь не найден'));
    return res
      .status(OK)
      .json(UpdateUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Неверный формат входных данных'));
    } else {
      return next(error);
    }
  }
};

// eslint-disable-next-line consistent-return
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const User = await user.findOne({ email }).select('+password');
    if (!User) {
      throw new UnAuthorized('Неверные почта или пароль');
    }
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      throw new UnAuthorized('Неверные почта или пароль');
    }
    const token = jwt.sign({ _id: User._id }, 'secret-key');
    return res
      .status(OK)
      .send({ token });
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const User = await user.findById(userId);
    if (!User) {
      return res
        .status(NotFoundError)
        .send({ message: 'Пользователь не найден' });
    }
    return res
      .status(OK)
      .send({
        name: User.name,
        email: User.email,
        about: User.about,
        avatar: User.avatar,
        _id: User._id,
      });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUsers, getUserById, createUser, updateUser, updateAvatar, login, currentUser,
};
