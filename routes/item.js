const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = require('../models/Item');
const User = require('../models/User')
const moment = require('moment');

/* Get All Items List  */
router.get('/itemList', function (req, res, next) {
    Item.find(function(err, data){
        if(err) return next(err);
        res.json(data);
    })
});

router.get('/itemList/date', function(req, res, next){
    // console.log('item Date', req.query);
    d = new Date().getDate();
    dt = moment(new Date()).subtract(d,'days').format("YYYY-MM-DD") + "T00:00:00Z";;
    // console.log(dt)
    it = req.query;
    Item.aggregate([ 
        { $match :{ uid : +it.uid ,
             date : { $gt : new Date(dt) } //new Date("2018-02-28T00:00:00Z")}
        }} ,
        { $group : { _id : { $dayOfMonth : "$date"}, items : { $push : "$$ROOT" }, totalSum:{ "$sum": "$price"} } }, //]).pretty()
        { $sort : { _id: -1 } }
    ]).then(ress => {
        // console.log('rss',ress)
         res.json(ress);
    })
});
/* Save Single Item */
router.post('/addItems', function(req, res, next){
    console.log('addItems: ', req.body)
    Item.create(req.body, function(err, post){
        if(err) return console.log(err);
        res.json(post);
    })
});

/* Delete Particular Item By ID*/
router.delete('/deleteItems', function(req, res, next){
    // console.log('params: ',req.query.id);
    // console.log('body: ' ,req.body);
    Item.findByIdAndRemove(req.query.id, req.body, function(err, del){
        if(err) return next(err);
        // console.log('del Items: ',del)
        res.json(del)
    })
});

/* Get Total Price of All Items */
router.get('/totalPrice', function(req, res, next){
    it = req.query;
    Item.aggregate([
        { $match : { uid : +it.uid}},
        { $group :{
            _id:"0",
            totalSum:{ $sum: "$price"}
        }}
    ]).then(resss => {
        // console.log('resss:',resss)
        res.json(resss);
    })
    // console.log('Total Price')
})

  /* Update Single Item By Id */
router.put('/updateItems/:id', function(req, res, next){
    // console.log('get Update', req.body)
    const updateBody = {  
        $set: {
            item: req.body.data.item,
            price: req.body.data.price,
            // updated_date: req.body.data.updated_date    
        }
    }
    Item.findByIdAndUpdate(req.params.id, updateBody , {new: true}, function(err, post){
        if(err) return next(err); 
        console.log(post);
        res.json(post)
    })
})

router.get('/monthlyExp', function(req, res, next){
    // console.log('monthly Expense');
    it = req.query;
    Item.aggregate([ 
        { $match :{ uid : +it.uid , 
            // date : { $lt :  new Date("2018-02-01T00:00:00Z") , $gt :  new Date("2018-12-31T00:00:00Z")}
         }},
        { $group : { _id : { $month : "$date"}, items : { $push : "$$ROOT" }, totalSum:{ "$sum": "$price"} } }, // ]).pretty()
        { $sort : { _id: 1 } }
    ]).then( mon => {
        // console.log('mon',mon);
        res.json(mon)
    })
});
router.get('/yearlyExp', function(req, res, next){
    // console.log('yearly expense')
    it = req.query;
    Item.aggregate([ 
        { $match :{ uid : +it.uid, 
            // date : { $lt : new Date("2019-01-01T00:00:00Z") , $gt : new Date("2017-12-31T00:00:00Z")} 
        }},
        { $group : { _id : { $year : "$date"}, items : { $push : "$$ROOT" }, totalSum:{ "$sum": "$price"} } }, //]).pretty()
        // { $sort : { _id: 1 } }
    ]).then( year => {
        // console.log('yearly', year);
        res.json(year)
    })
});
module.exports = router;