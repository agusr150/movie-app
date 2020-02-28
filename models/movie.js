'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Movie extends Model {}
  Movie.init({
    name: DataTypes.STRING,
    released_year: {
      type :Sequelize.INTEGER,
      validate: {
        customvalidator(value){
          if(Number.isInteger(value/4)){
            throw new Error ('movie di tahun kabisat')
          }
        }
      }
    },
    genre: DataTypes.STRING,
    productionHouseId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {sequelize})

  Movie.associate = function(models) {
    Movie.belongsTo(models.ProductionHOuse,{
      foreignKey: 'productionHouseId'}),
    Movie.belongsToMany(models.Cast,{ through : models.CastFilm, foreignKey: 'movieId'})
    // associations can be defined here
  };
  return Movie;
};