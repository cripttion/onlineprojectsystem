const sequelize = require('./../../../config/sequelize');
const Teacher = require('../../../models/Teacher')(sequelize);


const getAllTeacherData = async(req,res)=>{
    try {
        const teachers = await Teacher.findAll();
        if(teachers)
            {
                return res.status(200).json({teachers});
            }
            return res.status(400).json({message:"Unable to get the Data of Techer"});
      } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

module.exports = getAllTeacherData