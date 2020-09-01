'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  spot.init({
    name: DataTypes.STRING,
    gatewayId: DataTypes.STRING,
    useFaceRecognition: DataTypes.BOOLEAN,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'spot',
  });
  return spot;
};