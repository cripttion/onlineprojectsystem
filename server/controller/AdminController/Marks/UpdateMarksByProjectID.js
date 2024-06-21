const sequelize = require('./../../../config/sequelize');
const Marks = require('./../../../models/Marks')(sequelize);


const updateMarksTable = async (req, res) => {
    const { ProjectID, StudentID, marks } = req.body;
    if (!ProjectID || !StudentID || !marks) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const setClause = Object.keys(marks).map(key => `${key} = :${key}`).join(', ');
        const query = `
            UPDATE Marks 
            SET ${setClause}
            WHERE ProjectID = :ProjectID AND StudentID = :StudentID;
        `;
        await sequelize.query(query, {
            replacements: { ProjectID, StudentID, ...marks },
            type: sequelize.QueryTypes.UPDATE
        });
        res.status(200).json({ message: "Marks updated successfully" });
    } catch (error) {
        console.error("Error updating Marks table:", error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
};

const updateReviewerTable = async (req, res) => {
    const { projectID, reviewerMarks, StudentID } = req.body;
    if (!projectID || !reviewerMarks) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const response = await Marks.findOne({
            where: {
                ProjectID: projectID,
                StudentID:StudentID
            }
        });
        console.log(response);
        if (!response) {
            return res.status(404).json({ error: "Marks record not found for the given ProjectID" });
        }

        const MarksID = response.dataValues.MarksID;

        const setClause = Object.keys(reviewerMarks).map(key => `${key} = :${key}`).join(', ');
        const query = `
            UPDATE ReviewerMarks 
            SET ${setClause}
            WHERE MarksID = :MarksID;
        `;

        await sequelize.query(query, {
            replacements: { MarksID, ...reviewerMarks },
            type: sequelize.QueryTypes.UPDATE
        });

        res.status(200).json({ message: "Reviewer marks updated successfully" });
    } catch (error) {
        console.error("Error updating ReviewerMarks table:", error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
};


const updateGuideTable = async (req, res) => {
    const { projectID, guideMarks,StudentID } = req.body;
    if (!projectID || !guideMarks) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const response = await Marks.findOne({
            where: {
                ProjectID: projectID,
                StudentID:StudentID
            }
        });
       
        if (!response) {
            return res.status(404).json({ error: "Marks record not found for the given ProjectID" });
        }

        const MarksID = response.dataValues.MarksID;

        const setClause = Object.keys(guideMarks).map(key => `${key} = :${key}`).join(', ');
        const query = `
            UPDATE GuideMarks 
            SET ${setClause}
            WHERE MarksID = :MarksID;
        `;
        await sequelize.query(query, {
            replacements: { MarksID, ...guideMarks },
            type: sequelize.QueryTypes.UPDATE
        });
        res.status(200).json({ message: "Guide marks updated successfully" });
    } catch (error) {
        console.error("Error updating GuideMarks table:", error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
};

module.exports = { updateMarksTable, updateReviewerTable, updateGuideTable };
