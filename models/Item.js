const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
    // id: Number,
    name : String,
    price : Number,
    dates : String,
    // updated_date: {type: Date, default: Date.now },
});

module.exports = mongoose.model('Item', ItemSchema);