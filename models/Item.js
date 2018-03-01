const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
    // id: Number,
    item: String,
    price : Number,
    created_date : Date,
    updated_date: {type: Date, default: Date.now },
    // items: [{
    //     name: String,
    //     price: String
    // }]
});

module.exports = mongoose.model('Item', ItemSchema);