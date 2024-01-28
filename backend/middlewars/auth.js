/* eslint-disable consistent-return */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnAuthorized = require('./Unauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization.startsWith('Bearer')) {
    throw new UnAuthorized('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (error) {
    next(new UnAuthorized('Авторизацияfff'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
