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

/* Save Single Item */
router.post('/addItems', function(req, res, next){
    Item.create(req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    })
});

/* Delete Particular Item By ID*/
router.delete('/deleteItems', function(req, res, next){
    console.log('params: ',req.query.id);
    // console.log('body: ' ,req.body);
    Item.findByIdAndRemove(req.query.id, req.body, function(err, del){
        if(err) return next(err);
        console.log('del Items: ',del)
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
        console.log('resss:',resss)
        res.json(resss);
    })
    console.log('Total Price')
})

  /* Update Single Item By Id */
router.put('/:id', function(req, res, next){
    console.log('get Id: ',req.params.id);
    Item.findByIdAndUpdate(req.params.id, req.body, function(err, post){
        if(err) return next(err); 
        res.json(post)
    })
})

/* GET All Books */
// router.get('/', function(req, res, next) {
//     // res.json('Show the all Book')
//     Book.find(function (err, products){
//       if(err) return next(err);
//       res.json(products);
//     })
//   });
  
  /* GET Single Book By Id */
//   router.get('/:id', function(req, res, next){
//     Book.findById(req.params.id, function(err, post){
//       if(err) return next(err); 
//       res.json(post)
//     })
//   })
  
  /* UPDATE Book */
//   router.put('/:id', function(req, res, next){
//     // res.json("Update Book")
//     Book.findByIdAndUpdate(req.params.id, req.body, function(err, post){
//       if(err) return next(err);
//       res.json(post);
//     })
//   })
  
  /* DELETE Book */
//   router.delete('/:id', function(req, res, next){
//     // res.json("Delete Book");
//     Book.findByIdAndRemove(req.params.id, req.body, function(err, post){
//       if(err) return next(err);
//       res.json(post)
//     })
//   })
  

module.exports = router;