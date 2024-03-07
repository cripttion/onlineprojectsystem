const express = require("express");
const router = express.Router();

const sequelize = require("./../sequelize");
const { Sequelize, Op } = require("sequelize");

const multer = require("multer");
const xlsx = require("xlsx");
const { notRegistered } = require("../utility/Query");
const Student = require("../models/StudentList")(sequelize);
const ProjectDocument = require("../models/ProjectDocument")(sequelize);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const Teacher = require("../models/Teacher")(sequelize);
const Project = require("./../models/ProjectList")(sequelize);
const Guide = require("./../models/Guide")(sequelize);
const ProjectMember = require("./../models/ProjectMember")(sequelize);
const Marks = require("./../models/Marks")(sequelize);

router.post("/add-parameter", async (req, res) => {
  const { ColumnName } = req.body;
  try {
    await sequelize
      .query(
        `ALTER TABLE Marks ADD COLUMN ${ColumnName} VARCHAR(200) DEFAULT "0";`
      )
      .then(() => {
        return res.status(201).json({ message: "Column added successfully" });
      })
      .catch((error) => {
        return res.status(404).json({ error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
});

router.delete("/remove-paramter/:ColumnName", async (req, res) => {
  const ColumnName = req.params.ColumnName;
  try {
    await sequelize
      .query(`ALTER TABLE Marks DROP COLUMN ${ColumnName};`)
      .then(() => {
        return res.status(200).json({ message: "Column deleted successfully" });
      })
      .catch((error) => {
        return res.status(404).json({ error });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
});

router.get("/projectMarks/:projectID", async (req, res) => {
  const projectId = req.params.projectID;
  try {
    const query = `SELECT  s.Name, m.* FROM Marks as m JOIN Students as s ON m.StudentID = s.AdmissionNumber Where m.ProjectID = :projectID`;
    const response = await sequelize.query(query, {
      replacements: { projectID: projectId },
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update marks for multiple students in a project
router.put('/updateMarks/:projectID', async (req, res) => {
    const { projectID } = req.params;
    const updatedMarks = req.body;
  
    try {
      // Assuming updatedMarks is an array of objects with StudentID, Name, and updated marks
      for (const updatedMark of updatedMarks) {
        const mark = await Marks.findOne({
          where: {
            ProjectID: projectID,
            StudentID: updatedMark.StudentID
          }
        });
  
        if (!mark) {
          return res.status(404).json({ message: `Mark not found for student ${updatedMark.StudentID}` });
        }
  
        await mark.update(updatedMark);
      }
  
      res.status(200).json({ message: 'Marks updated successfully', updatedMarks });
    } catch (error) {
      console.error('Error updating marks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
module.exports = router;
