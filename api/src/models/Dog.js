const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    min_height:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    max_height:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    min_weight:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    max_weight:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    life_span:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },{
    timestamps: false,
  });
};
