const sequelize = require('./../../../config/sequelize');
const Student = require('./../../../models/StudentList')(sequelize);

const deleteStudentData = async(req,res)=>{
    const admissionNumber = req.params.admissionNumber;
    try {
      const st = await Student.destroy({
        where: { AdmissionNumber: admissionNumber },
      });
  
      if (st === 0) {
        return res.status(404).json({ error: "Record not found" });
      }
  
      res.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}


module.exports = deleteStudentData;