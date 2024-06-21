
const Student = require('../../../models/StudentList');
const sequelize = require('./../../../config/sequelize')
const ProjectMember = require('./../../../models/ProjectMember')(sequelize);

const getProjectDataByStudentID = async(req,res)=>{
  const StudentID = req.params.StudentID;
  try {
    const response = await ProjectMember.findAll({
      where: { StudentID: StudentID },
    });
    if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(501).json({ message: "Internal server Error" });
  }
}


module.exports = getProjectDataByStudentID;