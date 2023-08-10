const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Recipe = sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,        
      defaultValue: DataTypes.UUIDV4,    
      allowNull: false,
      primaryKey : true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resumenDelPlato: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nivelDeComidaSaludable: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pasoApaso: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdInDb:{                                 
      type : DataTypes.BOOLEAN,                    
      allowNull: false,
      defaultValue: true
    }
  });
  return Recipe;
};
