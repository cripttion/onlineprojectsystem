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

const isAbleToCreateProject = async (admissionNumber) => {
    try {
        const value = await ProjectMember.findAll({
            attributes: ["ProjectID"],
            where: { StudentID: admissionNumber },
        });

        return value;
    } catch (error) {
        console.error("Error in isAbleToCreateProject:", error);
        throw new Error("Error checking project membership");
    }
};

const getLastProjectId = async (year, semester) => {
    try {
        const value = `BT${year}${semester}%`;

        const query = `
        SELECT * FROM Projects
        WHERE ProjectID LIKE :value
        ORDER BY CAST(SUBSTRING(ProjectID, 5) AS UNSIGNED) DESC
        LIMIT 1;`;

        const projects = await sequelize.query(query, {
            replacements: { value: value },
            type: sequelize.QueryTypes.SELECT,
        });

        if (projects.length === 0) {
            return `BT${year}${semester}10`;
        }

        const lastProjectId = projects[0].ProjectID;
        const numberString = lastProjectId.substring(4);
        const number = parseInt(numberString, 10);
        const incrementedNumber = number + 1;

        return `BT${year}${semester}${incrementedNumber.toString().padStart(numberString.length, "0")}`;
    } catch (error) {
        console.error("Error in getLastProjectId:", error);
        throw new Error("Error fetching last project ID");
    }
};

const create = async (year, semester, members, school, domain, outcome) => {
    try {
        const tempValue = await getLastProjectId(year, semester);

        const [guide, reviewer] = await Teacher.findAll({
            where: { School: school },
            order: Sequelize.literal("RAND()"),
            limit: 2,
        });

        const project = await Project.create({
            ProjectID: tempValue,
            ProjectNumber: members,
            GuideID: guide.dataValues.TeacherID,
            ReviewerID: reviewer.dataValues.TeacherID,
            Status: "Pending",
            Year: year,
            Semester: semester,
            Domain: domain,
            ProjectOutcome: outcome
        });

        await ProjectDocument.create({ ProjectID: tempValue });

        await Guide.create({
            ProjectID: tempValue,
            GuideID: guide.dataValues.TeacherID,
            ReviewerID: reviewer.dataValues.TeacherID,
        });

        return tempValue;
    } catch (error) {
        console.error("Error in create:", error);
        throw new Error("Error creating project and group");
    }
};

const createGroupForProject = async (req, res) => {
    try {
        const { year, semester, admissionNumber, members, user, domain, outcome } = req.body;

        if (!year || !semester || !admissionNumber || !members || !user || !domain || !outcome) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const extractedChars = admissionNumber.match(/[A-Z]+/)[0];
        const data = await isAbleToCreateProject(admissionNumber);

        if (data.length > 0) {
            return res.status(400).json({ error: `You are already registered with group id ${data[0].ProjectID}` });
        }

        const tempValue = await create(year, semester, members, extractedChars, domain, outcome);

        const marks = await Marks.create({
            ProjectID: tempValue,
            StudentID: admissionNumber,
        });

        await ProjectMember.create({
            ProjectID: tempValue,
            StudentID: admissionNumber,
            Review1Marks: marks.dataValues.MarksID,
            Review2Marks: "0",
            CurrentStatus: "registered by self",
            Addby: user,
        });

        await ReviewerMarks.create({ MarksID: marks.dataValues.MarksID });
        await GuideMarks.create({ MarksID: marks.dataValues.MarksID });

        res.status(200).json({ message: "Project and group created successfully", tempValue });
    } catch (error) {
        console.error("Error creating project and group:", error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
};

module.exports = {createGroupForProject,create};
