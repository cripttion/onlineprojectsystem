// project-member-model.js
const { DataTypes } = require('sequelize');


const GuideMarks =(sequelize)=>{ 
return sequelize.define('GuideMarks', {
   GuideMarksId:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    allowNull:false,
   },
    MarksID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Marks",
      key: "MarksID",
    },
  },
  
  GuideMarksMTE:{
    type:DataTypes.STRING,
    allowNull:true,
  },
 
 GuideMarksFinal:{
    type:DataTypes.STRING,
    allowNull:true,
 },

  
}, {
  // Disable timestamps
  timestamps: false,
});
};

module.exports = GuideMarks;
