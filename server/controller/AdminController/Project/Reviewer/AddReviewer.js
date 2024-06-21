const sequelize = require('./../../../../config/sequelize');
const Project = require('./../../../../models/ProjectList')(sequelize);
const Guide = require('./../../../../models/Guide')(sequelize);



const getguideDetails = async (projectId) => {
    try {
      const project = await Project.findOne({
        attributes: ['GuideID'],
        where: {
          ProjectID: projectId
        }
      });
      if (project) {
        return project.GuideID;
      } else {
        return null; // Or handle the case when the project with the given ID is not found
      }
    } catch (error) {
      console.error('Error fetching reviewer details:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

const addNewReviewer = async(req,res)=>{
    const { teacherID, projectID } = req.body;

    try {
      // Get the reviewer ID
      const guideId = await getguideDetails(projectID);
  
      // Update the Guide table
      await Guide.create({
        ProjectID: projectID,
        ReviewerID: teacherID,
        GuideID:guideId
      });
  
      // Update the Project table
      await Project.update(
        { ReviewerID: teacherID },
        { where: { ProjectID: projectID } }
      );
  
      res.status(201).json({ message: 'reviewer updated successfully' });
    } catch (error) {
      console.error('Error updating guide:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = addNewReviewer;