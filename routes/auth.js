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
            User.findOne({'facebook.fbid': profile.id}, function (err, user) {
                if (err)
                    return console.error(err);
                if (user) {
                    console.log('old user fb');
                    if(!user.facebook.token){
                        user.facebook.token = profile.accessToken;
                        user.facebook.name = profile.name;
                        user.facebook.email = profile.email;
                        user.save(function(err){
                            if(err)
                                return console.error(err);
                        });
                    }
                    // console.log(user);
                    res.json(user);
                } else {
                    console.log('new user fb');
                    var newUser = new User();
                    newUser.facebook.fbid = profile.id;
                    newUser.facebook.token = profile.accessToken;
                    newUser.facebook.name = profile.name;
                    newUser.facebook.email = profile.email;

                    newUser.save(function (err) {
                        if (err)
                            return console.error(err);
                        return res.json(newUser);
                    });
                }
              //  console.log(profile.image);
            });
            //user is logged in already, and needs to be merged
     });
})

router.post('/google', function(req, res){
    profile = req.body.profileObj;
    accessToken = req.body.accessToken;
    // console.log('profile obj', profile);
    // console.log('token obj', accessToken)
    // res.json('google login response')
    process.nextTick(function(){
        User.findOne({'google.id': profile.id}, function (err, user) {
            if (err)
                return console.error(err);
            if (user) {
                console.log('old user google');
                if(!user.google.token){
                    user.google.token = accessToken;
                    user.google.name = profile.name;
                    user.google.email = profile.email;
                    user.save(function(err){
                        if(err)
                            return console.error(err);
                    });
                }
                // console.log(user);
                res.json(user);
            } else {
                console.log('new User google');
                var newUser = new User();
                newUser.google.id = profile.googleId;
                newUser.google.token = accessToken;
                newUser.google.name = profile.name;
                newUser.google.email = profile.email;

                newUser.save(function (err) {
                    if (err)
                        return console.error(err);
                    res.json(newUser);
                });
            }
            // console.log(profile.image);
        });
    })
})
module.exports = router;