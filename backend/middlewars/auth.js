/* eslint-disable consistent-return */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnAuthorized = require('./Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization.startsWith('Bearer')) {
    throw new UnAuthorized('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (error) {
    next(new UnAuthorized('Авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
