const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = require('../models/Item');

/* Get All Items List  */
router.get('/itemList', function (req, res, next) {
    Item.find(function(err, data){
        if(err) return next(err);
        res.json(data);
    })
});
router.get('/itemList/date', function(req, res, next){
    // console.log('item Date');
    // res.json('itemList / date')
    Item.aggregate([
        // "$project": {
        //     "$name":1,
        //     "$price":1
        // },
    {  $group:{
            _id: { $dateToString: { format: "%m-%d-%Y", date: "$created_date" } },
            totalSum:{ "$sum": "$price"},
            items: { $push: "$$ROOT" }
            }
    },
    {   $sort : { _id: -1 } }
    ]).then(ress => {
        // console.log('item/date: ',ress)
         res.json(ress);
    })
});
/* Save Single Item */
router.post('/addItems', function(req, res, next){
    // console.log('addItems: ', req.body)
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
    Item.aggregate([{
        "$group":{
            "_id":"0",
            "totalSum":{ "$sum": "$price"}
        }
    }]).then(resss => {
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
            updated_date: req.body.data.updated_date    
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
    Item.aggregate([
        { $group: {
            // _id: { $dateToString: { format: "%m-%Y", date: "$created_date" } },
            _id : { $month : "$created_date"},
            totalSum:{ "$sum": "$price"},
            items: {"$push" : "$$ROOT"}
        }},
        {   $sort : { _id: 1 } }
    ]).then( mon => {
        console.log('mon',mon);
        res.json(mon)
    })
});

module.exports = router;