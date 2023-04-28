const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {        
        len: [4, 150]
      }
    },
   
    min_height: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    max_height: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    min_weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    max_weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:"https://www.ibicosrl.com.ar/assets/images/17/default.png",
      validate: {isUrl: true}
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },{timestamps: false});
  ;
};
