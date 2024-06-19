const sequelize = require('./../../../config/sequelize');
const Student = require('./../../../models/StudentList')(sequelize);

const UpdateStudentData = async(req,res)=>{
    try {
        const admissionNumber = req.params.admissionNumber;
        const updatedData = req.body;
        
        const student = await Student.update(updatedData, {
          where: { AdmissionNumber: admissionNumber },
        });
        console.log(student);
        if(student[0]===0)
        {
                return res.status(400).json({message:"Unable to Update data"});
         }
         return  res.status(200).json({ message: "Student data updated" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message:"Internal server Error",error: error });
      }
}


module.exports = UpdateStudentData;