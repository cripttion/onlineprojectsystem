const sequelize = require('./../../../../config/sequelize');
const Project = require('./../../../../models/ProjectList')(sequelize);
const Guide = require('./../../../../models/Guide')(sequelize);
const Teacher = require("./../../../../models/Teacher");




const getReviewerOfProjectByID = async(req,res)=>{
    const projectId = req.params.projectID; // Corrected: Access projectID from req.params

  try {
    const query = `SELECT DISTINCT g.Name, g.TeacherID, g.Email, g.Phone, g.Position, g.school
    FROM Teachers AS g
    JOIN Guides AS gu ON gu.ReviewerID = g.TeacherID
    WHERE gu.projectID = :projectId;
    `;

    const response = await sequelize.query(query, {
      replacements: { projectId: projectId },
      type: sequelize.QueryTypes.SELECT,
    }); // Corrected: Await the query

    if (response) {
      res.status(200).json({ message: "Successfully fetched the data", data: response });
    } else {
      res.status(400).json({ message: "Unable to fetch the data" });
    }
  } catch (e) {
    console.error("Error while fetching the data:", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = getReviewerOfProjectByID;