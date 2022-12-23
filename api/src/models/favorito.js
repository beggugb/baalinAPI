'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorito extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorito.belongsTo(models.Publicacion, {
        foreignKey: 'publicacionId',
        as: 'publicacion',
      });
      Favorito.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  Favorito.init({
    userId: DataTypes.INTEGER,
    publicacionId: DataTypes.INTEGER,
    email:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Favorito',
  });
  return Favorito;
};