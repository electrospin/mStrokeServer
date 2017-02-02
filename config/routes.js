
module.exports.routes = {
  'GET /login': 'AuthController.login',
  'Post /signup': 'UserController.create',
  'POST /logout': 'AuthController.logout'
};
