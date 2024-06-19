const sequelize = require('./../../../config/sequelize');
const Student = require('./../../../models/StudentList')(sequelize);

const getStudentData = async(req,res)=>{
    const admissionNumber = req.params.admissionNumber;
    try {
      const stData = await Student.findAll({
        where: { AdmissionNumber: admissionNumber },
      });
      res.status(200).json({ studentData: stData });
    } catch (error) {
      res.status(400).json({ error: "error encountered while fetching" });
    }
}


module.exports = getStudentData;