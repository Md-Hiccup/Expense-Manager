
var mongoose =require('mongoose');
var bcrypt = require('bcrypt');
var userSchema = mongoose.Schema({
    local:{
        lid     : String,
        name    : { type: String,  trim: true},
        email   : { type: String,  trim: true, lowercase: true},
        password: { type: String},
        // passwordConf: { type: String, required: true}
    },
    google:{
        gid     : String,
        // token   : String,
        email   : String,
        name    : String,
    },
    facebook:{
        fbid    : String,
        // token   : String,
        email   : String,
        name    : String
    }
});

userSchema.methods.generateHash = function (password) {
    var salt = bcrypt.genSaltSync(13);
    var hash = bcrypt.hashSync(password,salt);
    return hash ;
};

userSchema.methods.validPassword = function(password){
    var compare = bcrypt.compareSync(password, this.local.password);
    return compare;
};

module.exports = mongoose.model('User', userSchema);