
const { where } = require('sequelize');
const sequelize = require('./../../../config/sequelize');
const Marks = require('./../../../models/Marks')(sequelize);
const GuideMarks = require('./../../../models/GuideMarks')(sequelize);
const ReviewerMarks = require('./../../../models/ReviewerMarks')(sequelize);



const getMakrsByProjectID = async(req,res)=>{
    const projectId = req.params.projectID;
    try {
      const query = `SELECT  s.Name, m.* FROM Marks as m JOIN Students as s ON m.StudentID = s.AdmissionNumber Where m.ProjectID = :projectID`;
      const response = await sequelize.query(query, {
        replacements: { projectID: projectId },
        type: sequelize.QueryTypes.SELECT,
      });
      const query2 = `SELECT * FROM GuideMarks WHERE MarksID= :marksID`
      const guideMarks = await sequelize.query(query2,{
        replacements:{marksID:response[0].MarksID},
        type:sequelize.QueryTypes.SELECT
      }
      )
      const query3 = `SELECT * FROM ReviewerMarks WHERE MarksID= :marksID`
      const reviwerMarks = await sequelize.query(query3,{
        replacements:{marksID:response[0].MarksID},
        type:sequelize.QueryTypes.SELECT
      }
      )

      res.status(200).json({Makrs:response,GuideMarks:guideMarks,ReviewerMarks:reviwerMarks});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = getMakrsByProjectID;