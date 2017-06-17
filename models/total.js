'use strict';
module.exports = function(sequelize, DataTypes) {
  var Total = sequelize.define('Total', {
    price: {type : DataTypes.INTEGER , defaultValue : 0 }
  },{
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Total.belongsTo(models.User);
      }
    }
  });
  return Total;
};