module.exports = {

  login: function (req, res) {
    var email = req.param('email');
    var password = req.param('password');
    console.log("recieved login");
    verifyParams(res, email, password)

    User.findOne({email: email}).then(function (user) {
      if (!user) {
        return invalidEmailOrPassword(res);
      }
      signInUser(req, res, password, user)
    }).catch(function (err) {
      return invalidEmailOrPassword(res);
    })
  },


   logout: function (req, res) {
    //"Forget" the user from the session.
    // subsequent requests from this user agent will NOT have 'req.session.me
    req.session.me = null;
//    req.session.destroy(function(err){
//         timeout(function(){
//            return res.redirect('/');
//         })
//    })
    //If this is not an HTML -wanting browser, e.g. AJAX/sockets/cURL/etc..  ,
    //send a simple response letting the user agent know they were logged out 
    //successfully.
    if(req.wantsJSON){
      return res.ok('Logged out successfully!');
    }
    
    //otherwise if this is an HTML-wanting browser, do a redirect.
    return res.redirect('/');
  }


};


//function logOutUser(){

//}

function signInUser(req, res, password, user) {
  User.comparePassword(password, user).then(
    function (valid) {
      if (!valid) {
        return this.invalidEmailOrPassword();
      } else {
        var responseData = {
          user: user,
          token: generateToken(user.id)
        }
        return ResponseService.json(200, res, "Successfully signed in", responseData)
      }
    }
  ).catch(function (err) {
    return ResponseService.json(403, res, "Forbidden")
  })
};


function invalidEmailOrPassword(res){
  return ResponseService.json(401, res, "Invalid email or password")
};

function verifyParams(res, email, password){
  if (!email || !password) {
    return ResponseService.json(401, res, "Email and password required")
  }
};


function generateToken(user_id) {
  return JwtService.issue({id: user_id})
};
