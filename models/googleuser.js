'use strict';
module.exports = function(sequelize, DataTypes) {
  var GoogleUser = sequelize.define('GoogleUser', {
    id: { type : DataTypes.STRING, primaryKey: true },
    name: DataTypes.STRING,
    token: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    createdAt : false,
    updatedAt : false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return GoogleUser;
};