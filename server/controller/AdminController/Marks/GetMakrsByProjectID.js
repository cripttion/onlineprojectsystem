const { where } = require('sequelize');
const sequelize = require('./../../../config/sequelize');
const Marks = require('./../../../models/Marks')(sequelize);
const GuideMarks = require('./../../../models/GuideMarks')(sequelize);
const ReviewerMarks = require('./../../../models/ReviewerMarks')(sequelize);

const getMakrsByProjectID = async (req, res) => {
  const projectId = req.params.projectID;
  try {
    const query = `
      SELECT s.Name, m.*
      FROM Marks as m
      JOIN Students as s ON m.StudentID = s.AdmissionNumber
      WHERE m.ProjectID = :projectID
    `;
    const response = await sequelize.query(query, {
      replacements: { projectID: projectId },
      type: sequelize.QueryTypes.SELECT,
    });

    // Initialize arrays to store guide marks and reviewer marks for each student
    let guideMarks = [];
    let reviewerMarks = [];

    // Iterate through each mark to get corresponding guide and reviewer marks
    for (const mark of response) {
      const marksID = mark.MarksID;

      const guideMarksQuery = `
        SELECT * FROM GuideMarks WHERE MarksID = :marksID
      `;
      const guideMarksResponse = await sequelize.query(guideMarksQuery, {
        replacements: { marksID },
        type: sequelize.QueryTypes.SELECT,
      });
      guideMarks = guideMarks.concat(guideMarksResponse);

      const reviewerMarksQuery = `
        SELECT * FROM ReviewerMarks WHERE MarksID = :marksID
      `;
      const reviewerMarksResponse = await sequelize.query(reviewerMarksQuery, {
        replacements: { marksID },
        type: sequelize.QueryTypes.SELECT,
      });
      reviewerMarks = reviewerMarks.concat(reviewerMarksResponse);
    }

    res.status(200).json({
      Makrs: response,
      GuideMarks: guideMarks,
      ReviewerMarks: reviewerMarks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getMakrsByProjectID;
