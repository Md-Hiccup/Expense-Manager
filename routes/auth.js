var User = require('./../models/User');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
// var passport = require('../../config/passport');

// localhost:3000/auth/
router.get('/user', function (req, res) {
    id = req.query.id
    User.findById(id, function(err, data){
        if(err) return next(err);
        res.json(data)
    });
});
router.post('/g/register', function(req, res) {
    profile = req.body.profileObj;
    // console.log('G',profile)
    var newUser = new User();
    newUser.google.gid = profile.googleId;
    // newUser.facebook.token = profile.accessToken;
    newUser.google.name = profile.name;
    newUser.google.email = profile.email 
    newUser.save(function (err) {
        if (err)
            return console.error(err);
        // console.log('g user',newUser)
        return res.json(newUser);
    });
});
router.post('/fb/register', function(req, res) {
    profile = req.body;
    console.log(profile)
    var newUser = new User(req.body);
    newUser.facebook.fbid = profile.id;
    // newUser.facebook.token = profile.accessToken;
    newUser.facebook.name = profile.name;
    newUser.facebook.email = profile.email 
    newUser.save(function (err) {
        if (err)
            return console.error(err);
        // console.log(newUser)
        // return res.json({ token: jwt.sign({ email: newUser.email, fullName: newUser.name, _id: newUser._id }, 'RESTFULAPIs') });
        return res.json(newUser);
    });
});
  
router.post('/g/signin', function(req, res) {
    profile = req.body.profileObj;
    // console.log('ggg ', profile)
    User.findOne({
      'google.email': profile.email
    }, function(err, user) {
      if (err) throw err;
    //   if (!user || !user.comparePassword(req.body.password)) {
    //     return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    //   }
    //   console.log('g', user)
      g = user.google;
      return res.json({ id: user._id, token: jwt.sign({ email: g.email, fullName: g.name, _id: user._id }, 'expenseManager') });
    });
});
router.post('/fb/signin', function(req, res) {
    profile = req.body
    // console.log('fb', profile.email)
    User.findOne({
      'facebook.email': req.body.email
    }, function(err, user) {
      if (err) throw err;
    //   if (!user || !user.comparePassword(req.body.password)) {
    //     return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    //   }
    //   console.log('fb', user)
      fb = user.facebook;
      return res.json({ id: user._id, token: jwt.sign({ email: fb.email, fullName: fb.name, _id: user._id }, 'expenseManager') });
    });
});
  


// /*********  Facebook Login  **************/
// router.post('/facebook', function(req, res){
//     // console.log('facebook login:', req.body);
//     profile = req.body;
//     process.nextTick(function(){
//         //user is not logged in yet
//             User.findOne({'facebook.fbid': profile.id}, function (err, user) {
//                 if (err)
//                     return console.error(err);
//                 if (user) {
//                     console.log('old user fb');
//                     return res.json({ token: jwt.sign({ email: profile.email, name: profile.name, fbid: profile.id}, 'expenseManager')})
//                     // if(!user.facebook.token){
//                     //     // user.facebook.token = profile.accessToken;
//                     //     user.facebook.name = profile.name;
//                     //     user.facebook.email = profile.email;
//                     //     user.save(function(err){
//                     //         if(err)
//                     //             return console.error(err);
//                     //     });
//                     // }
//                     // console.log(user);
//                     // res.json(user);
//                 } else {
//                     console.log('new user fb');
//                     var newUser = new User();
//                     newUser.facebook.fbid = profile.id;
//                     // newUser.facebook.token = profile.accessToken;
//                     newUser.facebook.name = profile.name;
//                     newUser.facebook.email = profile.email;

//                     newUser.save(function (err) {
//                         if (err)
//                             return console.error(err);
//                         return res.json(newUser);
//                     });
//                 }
//               //  console.log(profile.image);
//             });
//             //user is logged in already, and needs to be merged
//      });
// })

// /*********  Google Login  *************/
// router.post('/google', function(req, res){
//     profile = req.body.profileObj;
//     accessToken = req.body.accessToken;
//     // console.log('profile obj', profile);
//     // console.log('token obj', accessToken)
//     // res.json('google login response')
//     process.nextTick(function(){
//         User.findOne({'google.gid': profile.googleId}, function (err, user) {
//             if (err)
//                 return console.error(err);
//             if (user) {

//                 // console.log('old user google');
//                 return res.json({ token: jwt.sign({ email: profile.email, name: profile.name, gid: profile.googleId}, 'expenseManager')})
                
//                 // if(!user.google.token){
//                 //     user.google.token = accessToken;
//                 //     user.google.name = profile.name;
//                 //     user.google.email = profile.email;
//                 //     user.save(function(err){
//                 //         if(err)
//                 //             return console.error(err);
//                 //     });
//                 // }
//                 // // console.log(user);
//                 // res.json(user);
//             } else {
//                 console.log('new User google');
//                 var newUser = new User();
//                 newUser.google.gid = profile.googleId;
//                 // newUser.google.token = accessToken;
//                 newUser.google.name = profile.name;
//                 newUser.google.email = profile.email;

//                 newUser.save(function (err) {
//                     if (err)
//                         return console.error(err);
//                     res.json(newUser);
//                 });
//             }
//             // console.log(profile.image);
//         });
//     })
// })

module.exports = router;