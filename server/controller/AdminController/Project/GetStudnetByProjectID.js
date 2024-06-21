const sequelize = require('./../../../config/sequelize');




const getStudentByProjectID =  async (req, res) => {
    const projectId = req.params.projectID;
    try {
      const data = await sequelize.query(
        "SELECT  s.Name, s.AdmissionNumber, s.Email, s.Phone,p.Year,p.Semester " +
          "FROM ProjectMembers AS pm " +
          "JOIN Projects AS p ON pm.ProjectID = p.ProjectID " +
          "JOIN Students AS s ON pm.StudentID = s.AdmissionNumber " +
          "WHERE pm.ProjectID = :ProjectID;",
        {
          replacements: { ProjectID: projectId },
          type: sequelize.QueryTypes.SELECT,
        }
      );
  
      if (data)
        return res.json({ message: "Successfully fetched the data", data });
      res.json({ message: "Unable to fetch the data" });
    } catch (error) {
      console.error("Error while fetching the data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  module.exports = getStudentByProjectID;