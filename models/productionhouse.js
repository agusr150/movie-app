'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductionHOuse = sequelize.define('ProductionHOuse', {
    name_prodHouse: DataTypes.STRING,
    headquarters: DataTypes.STRING
  }, {});
  ProductionHOuse.associate = function(models) {
    ProductionHOuse.hasMany(models.Movie, {
      foreignKey: 'productionHouseId' 
    })
    // associations can be defined here
  };
  return ProductionHOuse;
};