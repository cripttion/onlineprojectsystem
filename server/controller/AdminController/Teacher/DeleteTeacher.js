const sequelize = require('./../../../config/sequelize');
const Teacher = require('../../../models/Teacher')(sequelize);

const deleteTeacherData = async(req,res)=>{
  const teacherID = req.params.teacherID;
  try {
    const st = await Teacher.destroy({
      where: { TeacherID: teacherID },
    });

    if (st === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteTeacherData;