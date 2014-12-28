var passport = require('passport');

exports.localSignup =   function(req, res, next){
    passport.authenticate('local-signup',function(err, user, info){
        if (err) { return next(err); }
        if(user){
            return res.json(user);
        }
        if(!user){ return res.json({'message':'Account already exists with the email.'}) }
    })(req, res, next);
}

exports.localLogin = function(req, res, next){
    passport.authenticate('local-login',function(err, user, info){
        if (err) { return next(err); }
        if(user){
            return res.json(user);
        }
        if(!user){ return res.json({'message':info['loginMessage']}) }
    })(req, res, next);
}

exports.logout = function (req, res) {
  if(req.user) {
    req.logout();
    res.json({'status':200});
  } else {
    res.send({'status':404});
  }
};


/**
 * Session
 * returns info on authenticated user
 */
exports.getCurentUserInfo = function (req, res) {
  res.json(req.user);
};


