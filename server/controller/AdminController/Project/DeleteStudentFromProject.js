const sequelize = require('../../../config/sequelize');

const multer = require("multer");
const xlsx = require("xlsx");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const ProjectMember = require('./../../../models/ProjectMember')(sequelize);
const Student = require('./../../../models/StudentList')(sequelize);
const Project = require('./../../../models/ProjectList')(sequelize);
const Marks = require('./../../../models/Marks')(sequelize);
const GuideMarks = require('./../../../models/GuideMarks')(sequelize);
const ReviewerMarks = require('./../../../models/ReviewerMarks')(sequelize);

const deleteStudentFromProject = async (req, res) => {
    const admissionNumber = req.params.admissionNumber;

    try {
        // Start a transaction
        const result = await sequelize.transaction(async (t) => {
            // Delete from ProjectMembers table
            await ProjectMember.destroy({
                where: { StudentID: admissionNumber },
                transaction: t,
            });

            // Find all Marks entries for the student
            const marksEntries = await Marks.findAll({
                where: { StudentID: admissionNumber },
                transaction: t,
            });

            // Extract all MarksID values
            const marksIDs = marksEntries.map(mark => mark.MarksID);

            // Delete from GuideMarks and ReviewerMarks tables using MarksID
            await GuideMarks.destroy({
                where: { MarksID: marksIDs },
                transaction: t,
            });

            await ReviewerMarks.destroy({
                where: { MarksID: marksIDs },
                transaction: t,
            });

            // Delete from Marks table
            await Marks.destroy({
                where: { StudentID: admissionNumber },
                transaction: t,
            });
        });
       
        
                return res.status(200).json({ message: "Data deleted successfully" });
            
        
        
    } catch (error) {
        console.error('Error during transaction:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = deleteStudentFromProject;
