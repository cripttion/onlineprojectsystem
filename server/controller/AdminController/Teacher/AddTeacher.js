const sequelize = require('./../../../config/sequelize');
const Teacher = require('../../../models/Teacher')(sequelize);
const multer = require("multer");
const xlsx = require("xlsx");
const storage = multer.memoryStorage();

const addTeacher = async(req,res)=>{
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
              const [teacher, created] = await Teacher.findOrCreate({
                where: {
                  TeacherID: row.AdmissionNumber
                    ? row.AdmissionNumber
                    : row.TeacherID,
                },
                defaults: {
                  Name: row.Name,
                  Phone: row.Phone,
                  Email: row.Email,
                  Cabin: row.Cabin,
                  Position:row.Position
                },
              });
            
              if (!teacher) {
                return res.status(400).json({ message: "something went wrong" });
              }else{
                return res.status(200).json({ message: "Data uploaded successfully" });

              }
              // if (!created) {
              //   console.log(`Entry with enrollment number ${row.enrollmentNumber} already exists. Skipping.`);
              // }

            } catch (error) {
                return res.status(402).json({message:"Error while Adding Teacher",error})

            }
          })
        );
    
      } catch (error) {
        console.error("Error adding students:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

module.exports = addTeacher;