const sequelize = require('./../../../config/sequelize');
const Project = require('./../../../models/ProjectList')(sequelize);


const getProjectDataByID = async(req,res)=>{
    const projectID = req.params.projectID;
  try {
    const response = await Project.findAll({
      where: { ProjectID: projectID },
    });
    if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(501).json({ message: "Internal server Error" });
  }
}
module.exports = getProjectDataByID;