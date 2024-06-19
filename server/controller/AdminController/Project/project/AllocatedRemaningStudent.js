const sequelize = require('../../../../config/sequelize');
const { Sequelize } = require('sequelize');
const { notRegistered } = require('../../../../utility/Query');
const { create } = require('./CreateGroup');
const Project = require('../../../../models/ProjectList')(sequelize);
const ProjectMember = require('../../../../models/ProjectMember')(sequelize);
const ReviewerMarks = require('../../../../models/ReviewerMarks')(sequelize);
const ProjectDocument = require('../../../../models/ProjectDocument')(sequelize);
const GuideMarks = require('../../../../models/GuideMarks')(sequelize);
const Marks = require('../../../../models/Marks')(sequelize);
const Guide = require('../../../../models/Guide')(sequelize);
const Teacher = require('../../../../models/Teacher')(sequelize);



const allocateRemaningStudentToGroup = async(req,res)=>{
    try {
        const { Year, Semester, numberOfTeammates, school } = req.body;
    
        const query = notRegistered(Year, Semester);
    
        let response = await sequelize.query(query, {
          replacements: {year:Year, semester:Semester },
          type: sequelize.QueryTypes.SELECT,
        });
        let i = 0;
    
    while (i < response.length) {
      const remainingMembers = response.length - i;
      const membersToAdd = Math.min(numberOfTeammates, remainingMembers);
      const tempArray = response.slice(i, i + membersToAdd);
      i = i + membersToAdd;
      const GroupID = await create(Year, Semester, numberOfTeammates, school);
      const projectMemberResults = await Promise.all(
        tempArray.map(async (data) => {
          // Create a Marks entry for the current student
          console.log("the data is ",data);
          const marks = await Marks.create({
            ProjectID: GroupID,
            StudentID: data.AdmissionNumber,
          });
      
          // Create a ProjectMember entry for the current student with the MarksID reference
          const projectMember = await ProjectMember.create({
            ProjectID: GroupID,
            StudentID: data.AdmissionNumber,
            Review1Marks: marks.dataValues.MarksID, // Use the MarksID from the newly created Marks entry
            Review2Marks: "0",
            CurrentStatus: "registered by admin",
            Addby: "admin",
          });
          await ReviewerMarks.create({ MarksID: marks.dataValues.MarksID });
        await GuideMarks.create({ MarksID: marks.dataValues.MarksID });
      
          return [marks, projectMember]; // Return both the Marks and ProjectMember entries
        })
      );
      
    }
        res.json({ response });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
}

module.exports = allocateRemaningStudentToGroup;