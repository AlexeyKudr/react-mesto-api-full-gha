const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3000/users/me',
  'http://localhost:3000/cards',
  'https://api.alexeykudr.nomoredomainsmonster.ru',
  'http://api.alexeykudr.nomoredomainsmonster.ru',
  'https://alexeykudr.nomoredomainsmonster.ru',
  'http://alexeykudr.nomoredomainsmonster.ru',
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.end();
  }
  next();
};
