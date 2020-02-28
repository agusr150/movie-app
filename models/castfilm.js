'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class CastFilm extends Model{}
  CastFilm.init({
    castId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    role: {
      type : Sequelize.STRING,
      validate: {
        notEmpty: true
        // customValidator(value){
        //   if(value === null || value ===""){
        //     throw new Error("field must be filled")
        //} 
      }
    } 
  }, {sequelize})
  CastFilm.associate = function(models) {
    // associations can be defined here
  };
  return CastFilm;
}




/*
  const CastFilm = sequelize.define('CastFilm', {
    castId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    role: {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {});
  CastFilm.associate = function(models) {
    // associations can be defined here
    //CastFilm.hasMany(models.Movie, { foreignKey: 'id' })
    //CastFilm.hasMany(models.Cast, { foreignKey: 'id' })
  };
  return CastFilm;
};
*/