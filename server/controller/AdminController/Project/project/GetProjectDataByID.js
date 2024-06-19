const sequelize = require('../../../../config/sequelize');
const { Sequelize } = require('sequelize');
const Project = require('../../../../models/ProjectList')(sequelize);
const ProjectMember = require('../../../../models/ProjectMember')(sequelize);
const ReviewerMarks = require('../../../../models/ReviewerMarks')(sequelize);
const ProjectDocument = require('../../../../models/ProjectDocument')(sequelize);
const GuideMarks = require('../../../../models/GuideMarks')(sequelize);
const Marks = require('../../../../models/Marks')(sequelize);
const Guide = require('../../../../models/Guide')(sequelize);
const Teacher = require('../../../../models/Teacher')(sequelize);



const getProjectDataByProjectID = async(req,res)=>{
    const projectID = req.params.projectID;
    try{

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server Error",error:error})
    }
}