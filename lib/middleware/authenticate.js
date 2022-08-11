const { verify } = require('../utils/jwtToken.js');

module.exports = async (req, res, next) => {
  console.log(req.cookies, 'cookies');
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME];
    console.log(req.headers, 'REQ HEADERRSSS');
    if (!cookie) throw new Error('You must be signed in to continue');
    const user = verify(cookie);
    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
