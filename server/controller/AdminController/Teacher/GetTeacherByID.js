const sequelize = require('./../../../config/sequelize');
const Teacher = require('../../../models/Teacher')(sequelize);


const getTeacherByID = async(req,res)=>{
    const admissionNumber = req.params.teacherID;
    try {
      const stData = await Teacher.findAll({
        where: {TeacherID: admissionNumber },
      });
      
      res.status(200).json({ teacherData: stData });
    } catch (error) {
      res.status(400).json({ error: "error encountered while fetching" ,error});
    }
}

module.exports = getTeacherByID;