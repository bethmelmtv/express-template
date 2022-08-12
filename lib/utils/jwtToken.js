const jwt = require('jsonwebtoken');

function sign(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    // expiresIn: '30d',
  });
}

function verify(cookie) {
  console.log(cookie, 'COOKIE');
  return jwt.verify(cookie, process.env.JWT_SECRET);
}

module.exports = {
  sign,
  verify,
};
