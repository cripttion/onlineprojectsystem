// project-member-model.js
const { DataTypes } = require('sequelize');


const OTP =(sequelize)=>{ 
return sequelize.define('Otps', {
 
Email:{
    type:DataTypes.STRING,
},  
Otp: {
      type: DataTypes.STRING,
      
},
  

  
}, {
  // Disable timestamps
  timestamps: false,
});
};

module.exports = OTP;
