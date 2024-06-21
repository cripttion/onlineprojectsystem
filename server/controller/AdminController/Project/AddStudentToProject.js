const sequelize = require('./../../../config/sequelize');
const Marks= require('./../../../models/Marks')(sequelize);
const ProjectMember = require('./../../../models/ProjectMember')(sequelize);
const GuideMarks = require('./../../../models/GuideMarks')(sequelize);
const ReviewerMarks = require('./../../../models/ReviewerMarks')(sequelize);


const isAbleToCreateProject = async (admissionNumber) => {
    try {
      const value = await ProjectMember.findAll({
        attributes: ["ProjectID"],
        where: {
          StudentID: admissionNumber,
        },
      });
  
      return value; // Assuming you want to return the result
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to be caught elsewhere if needed
    }
  };

const AddStudentToProjectGroup = async(req,res)=>{
    const projectID = req.params.projectID;
    const { admissionNumber, user } = req.body;
  
    try {
     
     const data = await isAbleToCreateProject(admissionNumber);
      if (data.length > 0) {
        return res.status(501).json({
          message: "You are already registered with group id",
          projectId: data,
        });
      }
  
      // Perform project member creation after OTP verification and project check
      const marks = await Marks.create({
        ProjectID: projectID,
        StudentID: admissionNumber,
      });
  
      const member = await ProjectMember.create({
        ProjectID: projectID,
        StudentID: admissionNumber,
        Review1Marks: marks.dataValues.MarksID,
        Review2Marks: "0",
        CurrentStatus: "registered by self",
        Addby: user,
      });

      await ReviewerMarks.create({ MarksID: marks.dataValues.MarksID });
      await GuideMarks.create({ MarksID: marks.dataValues.MarksID });

      // If everything succeeds, destroy the OTP data
  
      res.status(200).json({ message: "Student added successfully" });
  
    } catch (error) {
      console.error("Error adding student:", error);
      res.status(404).json({ error: error });
    }
}

module.exports = AddStudentToProjectGroup;