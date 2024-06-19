const sequelize = require('./../../../config/sequelize');
const Student = require('./../../../models/StudentList')(sequelize);

const allStudentData = async(req,res)=>{
    try {
        const students = await Student.findAll();
        if (students) {
          return res.status(200).json(students);
        }
        res.status(400).json(students);
      } catch (error) {
        // console.error("Error fetching students:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}


module.exports = allStudentData;