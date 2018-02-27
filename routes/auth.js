var User = require('./../models/User');
var express = require('express');
var router = express.Router();
// var passport = require('../../config/passport');

// localhost:3000/auth/
router.get('/', function (req, res) {
    res.render('index');
});
router.post('/facebook', function(req, res){
    // console.log('facebook login:', req.body);
    profile = req.body;
    process.nextTick(function(){
        //user is not logged in yet
        console.log(profile);
        console.log();
            User.findOne({'facebook.fbid': profile.id}, function (err, user) {
                if (err)
                    return console.error(err);
                if (user) {
                    console.log('old user');
                    if(!user.facebook.token){
                        user.facebook.token = profile.accessToken;
                        user.facebook.name = profile.name;
                        user.facebook.email = profile.email;
                        user.save(function(err){
                            if(err)
                                throw err;
                        });
                    }
                    return user;
                } else {
                    console.log('new user');
                    var newUser = new User();
                    newUser.facebook.fbid = profile.id;
                    newUser.facebook.token = profile.accessToken;
                    newUser.facebook.name = profile.name;
                    newUser.facebook.email = profile.email;

                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return newUser;
                    });
                }
              //  console.log(profile.image);
            });
            //user is logged in already, and needs to be merged
     });
})

// router.post('/google', function(req, res))
module.exports = router;