const sequelize = require('./../../../../config/sequelize');
const Project = require('./../../../../models/ProjectList')(sequelize);
const Guide = require('./../../../../models/Guide')(sequelize);


const getReviewerDetails = async (projectId) => {
    try {
      const project = await Project.findOne({
        attributes: ['ReviewerID'],
        where: {
          ProjectID: projectId
        }
      });
      if (project) {
        return project.ReviewerID;
      } else {
        return null; // Or handle the case when the project with the given ID is not found
      }
    } catch (error) {
      console.error('Error fetching reviewer details:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

const AddNewGuide = async(req,res)=>{
    const { teacherID, projectID } = req.body;

    try {
      // Get the reviewer ID
      const reviewerId = await getReviewerDetails(projectID);
  
      // Update the Guide table
     const response =  await Guide.create({
        ProjectID: projectID,
        GuideID: teacherID,
        ReviewerID: reviewerId
      });
  
      // Update the Project table
      const response2 = await Project.update(
        { GuideID: teacherID },
        { where: { ProjectID: projectID } }
      );
  
      res.status(201).json({ message: 'Guide updated successfully' });
    } catch (error) {
      console.error('Error updating guide:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = AddNewGuide;