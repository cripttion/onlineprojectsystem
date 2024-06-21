
const sequelize = require('./../../../../config/sequelize');

const ProjectTOguides = async(req,res)=>{
    try {
        const query = `SELECT
          t.TeacherID,
          COUNT(g.GuideID) AS TeacherCount,
          t.Name AS TeacherName,
          t.Email as Email,
          t.Phone as Phone
      FROM
          Teachers t
      LEFT JOIN
          Guides g ON g.GuideID = t.TeacherID
      GROUP BY
          t.TeacherID
          ORDER BY
          TeacherCount ASC;`;
    
        const response = await sequelize.query(query, {
          type: sequelize.QueryTypes.SELECT,
        });
        if (response) {
          res.status(200).json({ response });
        } else {
          res.status(404).json({ message: "Unable to fetch the data" });
        }
      } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
      }
}

module.exports = ProjectTOguides;