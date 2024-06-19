// project-member-model.js
const { DataTypes } = require("sequelize");

const ReviewerMarks = (sequelize) => {
  return sequelize.define(
    "ReviewerMarks",
    {
      ReviewerMarksId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      MarksID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Marks",
          key: "MarksID",
        },
      },
   
      ReviewerMarksMTE: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      ReviewerMarksFinal: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    
    },
    {
      // Disable timestamps
      timestamps: false,
    }
  );
};

module.exports = ReviewerMarks;
