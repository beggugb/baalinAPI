'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
   
    }
  }
  User.init({
    nombres: DataTypes.STRING,
    telefono: DataTypes.STRING,
    celular: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    filename: DataTypes.STRING,
    ciudad: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.prototype.comparePassword = function(passw, cb){
    bcrypt.compare(passw, this.password,(err,isMatch)=>{
      if(err){
        return cb(err);
      }
      cb(null,isMatch)
    })
  };
  User.beforeSave((user)=>{
    if(user.changed('password')){
      user.password = bcrypt.hashSync(user.password,bcrypt.genSaltSync(10),null);
    }
  })
  User.beforeUpdate((user)=>{
    if(user.changed('password')){
      user.password = bcrypt.hashSync(user.password,bcrypt.genSaltSync(10),null);
    }
  })
  return User;
};