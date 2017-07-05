/**
 * Created by hussain on 4/7/17.
 */
var express = require('express');
var router = express.Router();

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

    router.get('/profile', function (req, res) {
        res.render('logout', { user: req.user });
    })
    router.get('/logout', function (req, res) {
        req.logout();
        req.session.destroy(function (err) {
            res.redirect('/')
        });
    });

    return router ;
}