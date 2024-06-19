const sequelize = require('./../../../config/sequelize');
const Teacher = require('../../../models/Teacher')(sequelize);

const updateTeacherData = async(req,res)=>{
    try {
        const teacherID = req.params.teacherID;
        const updatedData = req.body;
        const student = await Teacher.update(updatedData, {
          where: { TeacherID: teacherID },
        });
       console.log(student);
        res.status(200).json({ message: "Teacher data updated" });
      } catch (error) {
        console.log(error);
        res.json({ error: error });
      }
}

module.exports = updateTeacherData;