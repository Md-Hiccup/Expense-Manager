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
            {name:req.body.name, price: req.body.price, UserId : req.body.uid, dates: req.body.dates}
            //{name:'HeadPhones', price: 600, UserId : 1}
        ]).then(function(){
            return db.Item.findAll({ where : {UserID : req.body.uid }});
        }).then(function(results){
            res.json(results);
        })
    });

    router.post('/itemList', function(req, res) {
        db.User.findAll({
            include: [{
                model: db.Item,
                //attributes : [ [ db.sequelize.fn('SUM', db.sequelize.col('price')), 'total']],
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

    router.post('/dailyExp', function (req, res) {
        db.Item.findAll({
            where: {UserId: req.body.uid , dates : req.body.dates},
            attributes: ['UserId', [db.sequelize.fn('dayname', db.sequelize.col('dates')),'day'],
                [db.sequelize.fn('SUM', db.sequelize.col('price')), 'totalPrice']]
        }).then(function (result) {
            res.json(result);
        });
    });

    router.post('/monthlyExp', function (req, res) {
        db.sequelize.query('select UserId, monthname(dates) as month, sum(price) as totalPrice from Items' +
            ' where month(dates)= ? AND UserId = ? ',
            {   replacements: [req.body.month, req.body.uid], type: db.sequelize.QueryTypes.SELECT
            }).then(function (items) {
            res.json(items);
        });
    });

    router.post('/weeklyExp', function (req, res) {
        db.sequelize.query('select week(dates) as week, sum(price) as weeklyExp from Items where ' +
            'week(dates) = ? AND UserId = ?',
            {
                replacements:[ req.body.weekId ,req.body.uid], type: db.sequelize.QueryTypes.SELECT
            }).then(function (tot) {
            console.log(tot);
            res.json(tot);
        })

    });


    return router;
}