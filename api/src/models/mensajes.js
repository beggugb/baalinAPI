'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mensajes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mensajes.belongsTo(models.Publicacion, {
        foreignKey: 'publicacionId',
        as: 'publicacion',
      });
      Mensajes.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  Mensajes.init({
    mensaje: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    publicacionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mensajes',
  });
  return Mensajes;
};