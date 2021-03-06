'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    dates : DataTypes.DATEONLY
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Item.belongsTo(models.User);
      }
    }
  });
  return Item;
};