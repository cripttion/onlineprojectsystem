const { allProjectDataQuery } = require('../../../../utility/Query');
const sequelize = require('../../../../config/sequelize');
const Project = require('../../../../models/ProjectList');
const ProjectMember = require('../../../../models/ProjectMember');


const getallProjectData = async(req,res)=>{
    const { year, semester, course, branch } = req.body;
    
    try {
        const {query,replacements} = allProjectDataQuery(year,semester,course,branch);
        const projects = await sequelize.query(query, {
          replacements,
          type: sequelize.QueryTypes.SELECT,
        });
        if(projects)
        {
                return res.status(200).json({message:"data",projects:projects});
         }
        return res.status(400).json({message:"unable to get the data"});
      } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

module.exports = getallProjectData;