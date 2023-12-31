const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Diets = sequelize.define('diets', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Diets;
};
