// project-member-model.js
const { DataTypes } = require('sequelize');


const Marks =(sequelize)=>{ 
return sequelize.define('Marks', {
 MarksID: {
    type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
  ProjectID:{
    type:DataTypes.STRING,
    allowNull:false
  },
  StudentID:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  GuideMarksMTE:{
    type:DataTypes.STRING,
    allowNull:true,
  },
  ReviewerMarksMTE:{
    type:DataTypes.STRING,
    allowNull:true,
  },
 GuideMarksFinal:{
    type:DataTypes.STRING,
    allowNull:true,
 },
 GuideMarksFinal:{
    type:DataTypes.STRING,
    allowNull:true,
 }

  
}, {
  // Disable timestamps
  timestamps: false,
});
};

module.exports = Marks;
