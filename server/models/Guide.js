const { DataTypes } = require('sequelize');

const Guide = (sequelize) => {
  return sequelize.define('Guide', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ProjectID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    GuideID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ReviewerID: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    // Disable timestamps
    timestamps: false,
  });
};

module.exports = Guide;
