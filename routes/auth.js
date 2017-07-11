/**
 * Created by hussain on 4/7/17.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

module.exports = function (passport) {

    router.get('/', function (req, res) {
        res.redirect('login');
    });
    router.get('/signup', function (req, res) {
        res.json('Signup');
    });

    router.post('/signup', passport.authenticate('local-signup', {
        failWithError: true
    }), function (user, req, res, next) {
        console.log('UserSignup  : ' + JSON.stringify(user));
        res.json(user);
    });

    router.get('/login', function (req, res) {
        res.json('login msg');
    });

    router.post('/login', passport.authenticate('local-login', {
        failWithError: true
    }), function (user, req, res, next) {
        console.log("UserLogin :" + JSON.stringify(user));
        res.json(user);
    });

    router.get('/google', passport.authenticate('google', { scope: [ 'profile', 'email' ]}));

    router.get('/google/callback', passport.authenticate('google', {
        //successRedirect : '/auth/profile',
        failureRedirect : '/auth/login'
    }),function (req, res) {
        res.redirect('/auth/profile');
    });

    router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

    router.get('/facebook/callback', passport.authenticate('facebook', {
        //successRedirect : '/auth/profile',
        failureRedirect : '/auth/login'
    }),function (req, res) {
        res.redirect('/auth/profile');
    });

    router.get('/profile', function (req, res) {
        res.render('logout');
    })
    router.get('/logout', function (req, res) {
        req.logout();
        req.session.destroy(function (err) {
            res.redirect('/')
        });
    });
    router.get("/withouttoken", function(req, res) {
        //res.send(req.user.id);
        console.log();
        res.json({message: "Success! user without token"});
    });

    router.use(function(req, res, next){
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if(token){
            // verifies secret and checks exp
            jwt.verify(token, 'secret', function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    return next();
                }
            });
        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    router.get("/withtoken", function(req, res) {
        //res.send(req.user.id);
        console.log();
        res.json({message: "Success! You can not see this without a token"});
    });

    return router ;
}