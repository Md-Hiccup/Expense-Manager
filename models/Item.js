const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
    uid: Number,
    item: String,   
    price : Number,
    date : Date
    // created_date : Date,
    // updated_date: {type: Date, default: Date.now },
});

module.exports = mongoose.model('Item', ItemSchema);