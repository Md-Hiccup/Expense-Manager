var express = require('express');
var passport = require('../config/passport') ;
var router = express.Router();
var db = require('../models');

module.exports = function (passport) {

  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
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
    res.json('login');
  });

  router.post('/login', passport.authenticate('local-login', {
    failWithError: true
  }), function (user, req, res, next) {
    console.log("UserLogin :" + JSON.stringify(user));
    res.json(user);
  });

  router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/')
    });
  });

  router.post('/addItems', function (req, res) {
    db.Item.bulkCreate([
      {name:req.body.name, price: req.body.price, UserId : req.body.uid}
      //{name:'HeadPhones', price: 600, UserId : 1}
    ]).then(function(){
        return db.Item.findAll();
    }).then(function(results){
        res.json(results);
    })
  });

  router.post('/itemList', function(req, res) {
    db.User.findAll({
        include: [{
            model: db.Item,
          //  attributes : [ [ db.sequelize.fn('SUM', db.sequelize.col('price')), 'total']],
            where: { UserId: req.body.uid }
          //  groupBy : [ 'UserId']
      }]
    }).then(function (result) {
      res.json(result);
    }).catch(console.error);
  });

  router.post('/totalPrice', function(req, res) {
      db.Item.findAll({
          where: {UserId: req.body.uid},
          attributes: ['UserId', [db.sequelize.fn('SUM', db.sequelize.col('price')), 'totalPrice']]
      }).then(function (result) {
          res.json(result);
      });
    });

 return router;
}