'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cliente.init({
    nombres: DataTypes.STRING,
    ci: DataTypes.STRING,
    email: DataTypes.STRING,    
    nit: DataTypes.STRING,
    telefono: DataTypes.STRING,
    celular: DataTypes.STRING,
    ivigencia: DataTypes.DATE,
    fvigencia: DataTypes.DATE,    
    token: DataTypes.STRING,
    tipo: DataTypes.STRING,
    filename: DataTypes.STRING,
    verificado: DataTypes.BOOLEAN,    
    agente: DataTypes.BOOLEAN,
    estado: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    publicaciones: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  Cliente.prototype.comparePassword = function(passw, cb){    
    bcrypt.compare(passw, this.password, (err, isMatch) =>{
      if(err){
        return cb(err);
      }
      cb(null,isMatch)
    })
  };
  /*Cliente.beforeSave((user)=>{
    if(user.changed('password')){
      user.password = bcrypt.hashSync(user.password,bcrypt.genSaltSync(10),null);
    }
  })
  Cliente.beforeUpdate((user)=>{
    if(user.changed('password')){
      user.password = bcrypt.hashSync(user.password,bcrypt.genSaltSync(10),null);
    }
  })*/
  return Cliente;
};