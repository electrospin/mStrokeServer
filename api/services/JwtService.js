var jwt = require('jsonwebtoken');
var jwtSecret = sails.config.secrets.jwtSecret;

module.exports = {
  issue: function (payload) {
    token = jwt.sign(payload, jwtSecret, {expiresIn: 45/*seconds*/ })
    return token
  },

  verify: function (token, callback) {
    return jwt.verify(token, jwtSecret, callback);
  }
}
