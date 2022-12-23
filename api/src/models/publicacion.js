'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publicacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
      Publicacion.belongsTo(models.Cliente, {
        foreignKey: 'clienteId',
        as: 'cliente',
      });
    }
  };
  Publicacion.init({
    label: DataTypes.STRING,
    direccion: DataTypes.STRING,
    condiciones: DataTypes.STRING,
    contrato: DataTypes.STRING,
    inmobiliaria: DataTypes.BOOLEAN,
    ivigencia: DataTypes.DATE,
    fvigencia: DataTypes.DATE,
    portada: DataTypes.STRING,
    filename1: DataTypes.STRING,
    filename2: DataTypes.STRING,
    filename3: DataTypes.STRING,
    filename4: DataTypes.STRING,
    moneda: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    precio: DataTypes.DECIMAL,
    pago: DataTypes.STRING,
    caracteristicas: DataTypes.TEXT,
    estado: DataTypes.BOOLEAN,
    destacado: DataTypes.BOOLEAN,
    tipo: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    provincia: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
    categoria: DataTypes.STRING,
    clienteId: DataTypes.INTEGER,
    dormitorios:DataTypes.INTEGER,
    garaje: DataTypes.BOOLEAN,
    amoblado: DataTypes.BOOLEAN,
    independiente: DataTypes.BOOLEAN,
    observaciones: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Publicacion',
  });
  return Publicacion;
};
