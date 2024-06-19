const express = require("express");
const router = express.Router();

const sequelize = require("../config/sequelize");
const { Sequelize, Op } = require("sequelize");

const multer = require("multer");
const xlsx = require("xlsx");
const ProjectMember = require("../models/ProjectMember")(sequelize);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const Teacher = require("./../models/Teacher")(sequelize);
const Project = require("./../models/ProjectList")(sequelize);
const Guide = require('./../models/Guide')(sequelize);
router.get("/allTeacher", async (req, res) => {
  try {
    const students = await Teacher.findAll();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new student
router.post("/teacherDataUpload", upload.single("file"), async (req, res) => {
  try {
    let data;

    if (req.file) {
      const buffer = req.file.buffer;
      const wb = xlsx.read(buffer, { type: "buffer" });
      const sheetName = wb.SheetNames[0];
      const sheet = wb.Sheets[sheetName];
      data = xlsx.utils.sheet_to_json(sheet);
    } else if (req.body) {
      // Use the data from req.body if no file is uploaded
      data = [req.body];
      console.log(data);
    } else {
      throw new Error("No data provided");
    }

    await sequelize.sync();

    await Promise.all(
      data.map(async (row) => {
        try {
          const [teacher, created] = await Teacher.findOrCreate({
            where: {
              TeacherID: row.AdmissionNumber
                ? row.AdmissionNumber
                : row.TeacherID,
            },
            defaults: {
              Name: row.Name,
              Phone: row.Phone,
              Email: row.Email,
              Cabin: row.Cabin,
            },
          });
          console.log(teacher);
          // if (!created) {
          //   console.log(`Entry with enrollment number ${row.enrollmentNumber} already exists. Skipping.`);
          // }
        } catch (error) {
          console.error("Error adding student:", error);
        }
      })
    );

    res.json({ message: "Data uploaded successfully" });
  } catch (error) {
    console.error("Error adding students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Endpoint to update the update the student data;
router.put("/updateTeacherData/:teacherId", async (req, res) => {
  try {
    const teacherID = req.params.teacherId;
    const updatedData = req.body;
    const student = await Teacher.update(updatedData, {
      where: { TeacherID: teacherID },
    });

    res.status(200).json({ message: "Teacher data updated" });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

//End point to Delete the Studnet Data
router.delete("/dlt-teacher/:teacherId", async (req, res) => {
  const teacherID = req.params.teacherId;
  try {
    const st = await Teacher.destroy({
      where: { TeacherID: teacherID },
    });

    if (st === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/updateMarks/:projectID", async (req, res) => {
  const projectId = req.params.projectID;
  const { marks, admissionNumber, examName } = req.body;
  console.log(examName);

  try {
    const [updatedRow] = await sequelize.query(
      `UPDATE ProjectMembers SET ${examName} = :marks WHERE ProjectID = :projectId AND StudentID = :admissionNumber;`,
      {
        replacements: {
          marks,
          projectId,
          admissionNumber,
        },
      }
    );

    console.log(updatedRow);

    if (updatedRow) {
      return res.status(200).json({ message: "Marks updated successfully" });
    }
    res.status(404).json({ message: "Unable to update" });
  } catch (error) {
    console.error("Error updating marks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/guideProjects/:guideID", async (req, res) => {
  const guideId = req.params.guideID;

  try {
    const response = await Project.findAll({
      attributes: ["ProjectID"],
      where: {
        GuideID: guideId,
      },
    });
    if (response.length > 0) {
      return res.status(200).json(response);
    }
    res.status(401).json({ message: "Data not found" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/reviewProjects/:reveiwerId", async (req, res) => {
  const reveiwerId = req.params.reveiwerId;

  try {
    const response = await Project.findAll({
      attributes: ["ProjectID"],
      where: {
        ReviewerID: reveiwerId,
      },
    });
    if (response.length > 0) {
      return res.status(200).json(response);
    }
    res.status(401).json({ message: "Data not found" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/guide/:projectID", async (req, res) => {
  const projectId = req.params.projectID; // Corrected: Access projectID from req.params

  try {
    const query = `SELECT DISTINCT g.Name, g.TeacherID, g.Email, g.Phone, g.Position, g.school
    FROM Teachers AS g
    JOIN Guides AS gu ON gu.GuideID = g.TeacherID
    WHERE gu.projectID = :projectId;
    `;

    const response = await sequelize.query(query, {
      replacements: { projectId: projectId },
      type: sequelize.QueryTypes.SELECT,
    }); // Corrected: Await the query

    if (response) {
      res.json({ message: "Successfully fetched the data", data: response });
    } else {
      res.json({ message: "Unable to fetch the data" });
    }
  } catch (e) {
    console.error("Error while fetching the data:", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/teachers-not-assigned/:projectID", async (req, res) => {
  const { projectID } = req.params;

  try {
    const query = `
    SELECT t.Name, t.TeacherID, COUNT(p.GuideID) AS NumberOfProjects
    FROM Teachers t
    LEFT JOIN Projects p ON t.TeacherID = p.GuideID 
    WHERE t.TeacherID NOT IN (
        SELECT GuideID FROM Guides WHERE ProjectID = :projectID
    )
    GROUP BY t.TeacherID;
    `;
    const teachers = await sequelize.query(query, {
      replacements: { projectID },
      type: sequelize.QueryTypes.SELECT,
    });

    res.status(200).json({ teachers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/teacher-as-guide", async (req, res) => {
  try {
    const query = `SELECT
      t.TeacherID,
      COUNT(g.GuideID) AS TeacherCount,
      t.Name AS TeacherName,
      t.Email as Email,
      t.Phone as Phone
  FROM
      Teachers t
  LEFT JOIN
      Guides g ON g.GuideID = t.TeacherID
  GROUP BY
      t.TeacherID
      ORDER BY
      TeacherCount ASC;`;

    const response = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    if (response) {
      res.status(200).json({ response });
    } else {
      res.status(404).json({ message: "Unable to fetch the data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
});

router.get("/teacher-as-reviewer", async (req, res) => {
  try {
    const query = `SELECT
      t.TeacherID,
      COUNT(g.GuideID) AS TeacherCount,
      t.Name AS TeacherName,
      t.Email as Email,
      t.Phone as Phone
  FROM
      Teachers t
  LEFT JOIN
      Guides g ON g.ReviewerID = t.TeacherID
  GROUP BY
      t.TeacherID
      ORDER BY
      TeacherCount ASC;`;

    const response = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    if (response) {
      res.status(200).json({ response });
    } else {
      res.status(404).json({ message: "Unable to fetch the data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
});

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

router.post('/update-guide', async (req, res) => {
  const { teacherId, projectID } = req.body;

  try {
    // Get the reviewer ID
    const reviewerId = await getReviewerDetails(projectID);

    // Update the Guide table
    await Guide.create({
      ProjectID: projectID,
      GuideID: teacherId,
      ReviewerID: reviewerId
    });

    // Update the Project table
    await Project.update(
      { GuideID: teacherId },
      { where: { ProjectID: projectID } }
    );

    res.status(200).json({ message: 'Guide updated successfully' });
  } catch (error) {
    console.error('Error updating guide:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get("/reviwer/:projectID", async (req, res) => {
  const projectId = req.params.projectID; // Corrected: Access projectID from req.params

  try {
    const query = `SELECT DISTINCT g.Name, g.TeacherID, g.Email, g.Phone, g.Position, g.school
    FROM Teachers AS g
    JOIN Guides AS gu ON gu.ReviewerID = g.TeacherID
    WHERE gu.projectID = :projectId;
    `;

    const response = await sequelize.query(query, {
      replacements: { projectId: projectId },
      type: sequelize.QueryTypes.SELECT,
    }); // Corrected: Await the query

    if (response) {
      res.json({ message: "Successfully fetched the data", data: response });
    } else {
      res.json({ message: "Unable to fetch the data" });
    }
  } catch (e) {
    console.error("Error while fetching the data:", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

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

router.post('/update-reviewer', async (req, res) => {
  const { teacherId, projectID } = req.body;

  try {
    // Get the reviewer ID
    const guideId = await getguideDetails(projectID);

    // Update the Guide table
    await Guide.create({
      ProjectID: projectID,
      ReviewerID: teacherId,
      GuideID:guideId
    });

    // Update the Project table
    await Project.update(
      { ReviewerID: teacherId },
      { where: { ProjectID: projectID } }
    );

    res.status(200).json({ message: 'reviewer updated successfully' });
  } catch (error) {
    console.error('Error updating guide:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
