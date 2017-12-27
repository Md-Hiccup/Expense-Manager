'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {  type:DataTypes.STRING, validate : { isEmail:true  }},
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Item);
        User.hasOne(models.Total)
      }
    }
  });
  return User;
};