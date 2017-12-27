var express = require('express');
var passport = require('../config/passport') ;
var router = express.Router();
var db = require('../models');

module.exports = function (passport) {

    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('index');
    });

    router.post('/addItems', function (req, res) {
        db.sequelize.query('Select id from Users where id = ?',
        {
            replacements:[req.body.uid], type: db.sequelize.QueryTypes.SELECT
        }).then(function (userID) {
           if(userID[0] !== undefined){
               console.log(userID[0]);
               db.Item.create(
                   {name:req.body.name, price: req.body.price, UserId : req.body.uid, dates: req.body.dates}
                   //{name:'HeadPhones', price: 600, UserId : 1, dates: 2017-12-27}
               )
               .then(function(results){
                   console.log(results);
                   res.json({Items:results , message: 'item added successfully'});
               });
           }else{
               res.json({message: 'enter valid user id'})
           }
       });
    });

    router.post('/itemList', function(req, res) {
        db.User.findAll({
            include: [{
                model: db.Item,
                // attributes : [ [ db.sequelize.fn('SUM', db.sequelize.col('price')), 'total']],
                where: { UserId: req.body.uid }
                //  groupBy : [ 'UserId']
            }]
            //{ uid : 1}
        }).then(function (result) {
            console.log(result[0]);
            if(result[0] !== undefined)
                res.json(result);
            else
                res.json({message:'user id is not valid'});
        })
    });

    router.post('/totalPrice', function(req, res) {
        db.Item.findAll({
            where: {UserId: req.body.uid},
            attributes: ['UserId', [db.sequelize.fn('SUM', db.sequelize.col('price')), 'totalPrice']]
            //{ uid : 1}
        }).then(function (total) {
            console.log(total[0].dataValues.UserId);
            if(total[0].dataValues.UserId)
                res.json(total);
            else
                res.json({message: 'user Is not valid'})
        });
    });

    router.post('/dailyExp', function (req, res) {
        db.Item.findAll({
            where: {UserId: req.body.uid , dates : req.body.dates},
            attributes: ['UserId', [db.sequelize.fn('dayname', db.sequelize.col('dates')),'day'],
                [db.sequelize.fn('SUM', db.sequelize.col('price')), 'totalPrice']]
            //{ uid : 1, dates: 2017-12-27}
        }).then(function (daily) {
            console.log(daily);
            if(daily[0].dataValues.day)
                res.json(daily);
            else
                res.json({message: 'nothing bought'});
        });
    });

    router.post('/monthlyExp', function (req, res) {
        db.sequelize.query('select UserId, monthname(dates) as month, sum(price) as totalPrice from Items' +
            ' where month(dates)= ? AND UserId = ? ',
            {   replacements: [req.body.month, req.body.uid], type: db.sequelize.QueryTypes.SELECT
            }
            //{ uid : 1, month: 2017-12-27}
        ).then(function (monthly){
            console.log(monthly);
            console.log(monthly[0].UserId);
            if(monthly[0].month)
                res.json(monthly);
            else
                res.json({message: "user didn't buy things in this month"});
        });
    });

    router.post('/weeklyExp', function (req, res) {
        db.sequelize.query('select week(dates) as week, sum(price) as weeklyExp from Items ' +
            ' where week(dates) = ? AND UserId = ?',
            {
                replacements:[ req.body.week ,req.body.uid], type: db.sequelize.QueryTypes.SELECT
            }
            // {week : 52, uid: 1}
        ).then(function (week) {
            console.log(week);
            if(week[0].week)
                res.json(week);
            else
                res.json({message:'no items bought on this week'});
        })
    });

    router.post('/quarterExp', function (req, res) {
        db.sequelize.query('select quarter(dates) as quarter, sum(price) as QuarterExp from Items where ' +
            ' quarter(dates) = ? AND UserId = ?',
            {
                replacements : [req.body.quarter, req.body.uid], type: db.sequelize.QueryTypes.SELECT
            }
            // {quarter: 4, uid: 1}
        ).then(function (quarter){
            console.log(quarter);
                if(quarter[0].quarter)
                    res.json(quarter);
                else
                    res.json({message: 'quarter should be 1, 2, 3, 4'});
            })
    });

    return router;
}