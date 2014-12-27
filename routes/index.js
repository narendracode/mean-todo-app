var express = require('express');
var router = express.Router();
//var passport = require('../app/authorization/passport.js');
var passport = require('passport');
/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile('test.html');
});



router.post('/signup',function(req, res, next){
    passport.authenticate('local-signup',function(err, user, info){
        console.log(' err:'+JSON.stringify(err)+'    ,user:'+JSON.stringify(user)+'  ,info:'+JSON.stringify(info));
        
        //console.log('  err:'+err+'  ,user:'+user+'  , sign up info :'+info['signupMessage']);
        if (err) { return next(err); }
        if(user){
            console.log("****** req:"+req);
            return res.json(user);
        }
        if(!user){ return res.json({'message':'Email already taken'}) }
        
    })(req, res, next);
});


//loginStrategy
router.post('/login',function(req, res, next){
    passport.authenticate('local-login',function(err, user, info){
        console.log(' err:'+JSON.stringify(err)+'    ,user:'+JSON.stringify(user)+'  ,info:'+JSON.stringify(info));
        
        //console.log('  err:'+err+'  ,user:'+user+'  , sign up info :'+info['signupMessage']);
        if (err) { return next(err); }
        if(user){
            console.log("****** req:"+req);
            return res.json(user);
        }
        if(!user){ return res.json({'message':'invalid username or password'}) }
        
    })(req, res, next);
});

module.exports = router;
