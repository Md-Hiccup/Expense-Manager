var User = require('./../models/User');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

const verifiedToken = function(req, res, next){
//    console.log('sploit',req.headers.token.split(' '));
   const token = req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT';
   if (req.headers.token.split(' ')[0] === 'JWT') {    
//    jwt.verify(req.headers.authorization.split(' ')[1], 'expenseManager', function(err, decode) {
    jwt.verify(req.headers.token.split(' ')[1], 'expenseManager', function(err, decode) {
       if (err) {
           res.status(403).json({
           success: false,
           message: err.message
           })
       }
        req.decoded = decode;
        console.log('token remainnnss', req.decoded)
        next();
     });
   } else {
       // req.decoded = undefined;
       console.log('do something')
       next();
   }
}
router.get('/user', verifiedToken, function (req, res, next) {
    var id = req.query.id
    token = req.headers.token;
    // console.log('token', token, req.decoded)
    if(token){
        User.findById(id, function(err, data){
            if(err) return next(err);
            res.json(data)
        });
    }else {
        console.log('token expired')
    }
});
router.get('/logout',function(req, res){
    // console.log('logoout');
    // console.log('logout',req.session);
    req.session.destroy();
    // console.log('logout',req.session);
    res.status(200).json({message: 'logout and session destroyed'});
})
router.post('/register', function(req, res){
    var profile = req.body;
    console.log('local register: ', profile);
    User.findOne({ 'local.email': profile.email}, function(err, post){
        if(err) console.error(err);
        if(post){
            console.log('opssttt',post)
            return res.status(401).json({ message: 'already presentt'})
        } else {
            console.log('local register');
            var newUser = new User();
            newUser.local.lid = (((1+Math.random())*0x10000000)|0).toString(10).substring(1);
            console.log(newUser.local.lid);
            newUser.local.name = profile.name;
            newUser.local.email = profile.email;
            newUser.local.password = newUser.generateHash(profile.password);
            newUser.save(function (err) {
                if (err)
                    return console.error(err);
                // console.log('g user',newUser)
                return res.status(200).json(newUser);
            });
        }
    })
})
router.post('/signin', function(req, res){
    var profile = req.body;
    // console.log('lcoalt', profile);
    User.findOne({
        'local.email': profile.email
      }, function(err, user) {
        if (err) throw err;
        if (!user || !user.validPassword(profile.password)){
          return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        }else {
        // console.log('user', user)
        // req.session = user.local.lid
        // console.log('session email', req.session)
        l = user.local;
        const token = jwt.sign(
            { email: l.email, fullName: l.name, _id: user._id },
            'expenseManager', 
            {expiresIn: '20s', issuer: 'veloperst.com', subject: 'userInfo'});
        return res.json({ id: user._id, token: token});
        }
      });
})
router.post('/g/register', function(req, res) {
    var profile = req.body.profileObj;
    console.log('G',profile)
    User.findOne(
        { 'google.email': profile.email 
        }, function(err, post){
            if(err) console.error(err);
            // console.log('post',post)
            if(post){
                console.log('poset err', post)
                return res.status(401).json({message: 'already present'});
                // return post;
            }else {
                console.log('new user google')
                var newUser = new User();
                newUser.google.gid = profile.googleId;
                // newUser.facebook.token = profile.accessToken;
                newUser.google.name = profile.name;
                newUser.google.email = profile.email 
                newUser.save(function (err) {
                    if (err)
                        return console.error(err);
                    // console.log('g user',newUser)
                    return res.status(200).json(newUser);
                });
            }
        });
        return;
});

router.post('/fb/register', function(req, res) {
    var profile = req.body;
    console.log(profile)
    User.findOne(
        { 'facebook.email': profile.email 
        }, function(err, post){
            if(post){
                console.log('post err ',post)
                return res.status(401).json({message: 'already present'});
            } else {
                console.log('new user facebook');
                var newUser = new User(req.body);
                newUser.facebook.fbid = profile.id;
                // newUser.facebook.token = profile.accessToken;
                newUser.facebook.name = profile.name;
                newUser.facebook.email = profile.email 
                newUser.save(function (err) {
                    if (err)
                        return console.error(err);
                    // console.log(newUser)
                    return res.json(newUser);
                });
            }
        })
});
  
router.post('/g/signin', function(req, res) {
    var profile = req.body.profileObj;
    console.log('ggg ', profile)
    User.findOne({
      'google.email': profile.email
    }, function(err, user) {
    if (err) throw err;
    if (!user )//|| !user.comparePassword(req.body.password)) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    //   console.log('g', user)
        g = user.google;
        const token = jwt.sign(
            { email: g.email, fullName: g.name, _id: user._id }, 
            'expenseManager', 
            {expiresIn: '20s', issuer: 'veloperst.com', subject: 'userInfo'}) ;
      return res.json({ id: user._id, token: token });
    });
});
router.post('/fb/signin', function(req, res) {
    var profile = req.body
    // console.log('fb', profile.email)
    User.findOne({
      'facebook.email': req.body.email
    }, function(err, user) {
      if (err) throw err;
      if (!user) //|| !user.comparePassword(req.body.password)) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    //   }
    //   console.log('fb', user)
      fb = user.facebook;
      const token = jwt.sign(
          { email: fb.email, fullName: fb.name, _id: user._id }, 
            'expenseManager',
            {expiresIn: '20s', issuer: 'veloperst.com', subject: 'userInfo'}) ;
      return res.json({ id: user._id, token: token });
    });
});

module.exports = router;