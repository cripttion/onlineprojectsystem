
const sequelize = require('../../../config/sequelize');

const multer = require("multer");
const xlsx = require("xlsx");
const { notRegistered } = require('../../../utility/Query');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const ProjectMember = require('./../../../models/ProjectMember')(sequelize);
const Student = require('./../../../models/StudentList')(sequelize);
const Project = require('./../../../models/ProjectList')(sequelize);
const Marks = require('./../../../models/Marks')(sequelize);
const GuideMarks = require('./../../../models/GuideMarks')(sequelize);
const ReviewerMarks = require('./../../../models/ReviewerMarks')(sequelize);



const notRegisteredStudent = async(req,res)=>{
    const { year, semester } = req.body;

    try {
      const query = notRegistered(year, semester);
  
      const data = await sequelize.query(query, {
        replacements: { year, semester },
        type: sequelize.QueryTypes.SELECT,
      });
      console.log(data);
      res.json({ message: "Successfully fetched the data", data });
    } catch (error) {
      res.status(500).json({ message: "Unable to find" });
    }
}


module.exports = notRegisteredStudent;