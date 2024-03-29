/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
//  if (req.session.sessionAuth) {
    if(req.secure){
	console.log("auth successfully-policies/isHTTPS.js");
    return next();
    // else return res.send(403);
  }else {
	console.log("NOT authenticated-policices/isHTTPS.js");   
	res.redirect('https://' + req.headers.host + req.url);
	   
	}
	
  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  //return res.forbidden('You are not permitted to perform this action.');
};
