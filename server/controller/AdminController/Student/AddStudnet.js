
const sequelize = require('../../../config/sequelize');

const multer = require("multer");
const xlsx = require("xlsx");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const ProjectMember = require('./../../../models/ProjectMember')(sequelize);
const Student = require('./../../../models/StudentList')(sequelize);
const Project = require('./../../../models/ProjectList')(sequelize);
const Marks = require('./../../../models/Marks')(sequelize);
const GuideMarks = require('./../../../models/GuideMarks')(sequelize);
const ReviewerMarks = require('./../../../models/ReviewerMarks')(sequelize);



const addStudent = async(req,res)=>{
    
    try {
        let data;
    
        if (req.file) {
          const buffer = req.file.buffer;
          const wb = xlsx.read(buffer, { type: "buffer" });
          const sheetName = wb.SheetNames[0];
          const sheet = wb.Sheets[sheetName];
          data = xlsx.utils.sheet_to_json(sheet);
        } else if (req.body) {
          // Use the data from req.body if no file is uploaded
          data = [req.body];
          console.log(data);
        } else {
          throw new Error("No data provided");
        }
    
        await sequelize.sync();
    
        await Promise.all(
          data.map(async (row) => {
            try {
              const maxStudentID = await Student.max("StudentID");
              const [student, created] = await Student.findOrCreate({
                where: { AdmissionNumber: row.AdmissionNumber },
                defaults: {
                  EnrollmentNumber: row.EnrollmentNumber,
                  Name: row.Name,
                  Branch: row.Branch,
                  Year: parseInt(row.Year),
                  Semester: parseInt(row.Semester),
                  Phone: row.Phone,
                  Email: row.Email,
                  Course: row.Course,
                  Session: row.Session,
                  StudentID: maxStudentID ? maxStudentID + 1 : 1,
                },
              });
              
              if (!student) {
                return res.status(400).json({ message: "something went wrong" });
              }else{
                res.status(200).json({ message: "Data uploaded successfully" });

              }
              // if (!created) {
              //   console.log(`Entry with enrollment number ${row.enrollmentNumber} already exists. Skipping.`);
              // }
            } catch (error) {
                return res.status(400).json({message:"Error while Adding Studnet",error:error.message})
            }
          })
        );
    
      } catch (error) {
        console.error("Error adding students:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }



module.exports = addStudent;