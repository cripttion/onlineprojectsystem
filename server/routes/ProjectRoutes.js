const express = require("express");
const router = express.Router();

const sequelize = require("../config/sequelize");
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
const mailSender = require('./../utility/mailSender');
const Otp = require('./../models/Otp')(sequelize);
const isAbleToCreateProject = async (admissionNumber) => {
  try {
    const value = await ProjectMember.findAll({
      attributes: ["ProjectID"],
      where: {
        StudentID: admissionNumber,
      },
    });

    return value; // Assuming you want to return the result
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be caught elsewhere if needed
  }
};

// router.get('/testingFunction', async (req, res) => {
//   try {
//     const data = await isAbleToCreateProject('20SCSE1010340');
//     console.log(data);
//     res.send(data); // Assuming you want to send the result as a response
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error'); // Handle the error appropriately
//   }
// });

// Function to get the current year and semester
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
    console.log("The dat is wnat Is", projects);
    const lastProjectId = projects[0].ProjectID;
    const numberString = lastProjectId.substring(4);
    const number = parseInt(numberString);
    const incrementedNumber = number + 1;

    return `BT${year}${semester}${incrementedNumber
      .toString()
      .padStart(numberString.length, "0")}`;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

router.get("/allProjects", async (req, res) => {
  const { year, semester, course, branch } = req.query;

  let query =
    "SELECT p.ProjectID, p.ProjectTitle, g.Name as superviorName, g.TeacherID as SupervisorID , g.Position, g.Phone as SupervisorPhone ,g.Email as SupervisorEmail, g.Cabin as SupervisorCabin, s.Name, s.AdmissionNumber, s.Email, s.Phone FROM Projects AS p JOIN Teachers AS g ON p.GuideID = g.TeacherID JOIN ProjectMembers AS m ON p.ProjectID = m.ProjectID JOIN Students AS s ON m.StudentID = s.AdmissionNumber";
  let whereClause = [];
  let replacements = {};

  if (year) {
    whereClause.push("p.year = :year");
    replacements.year = year;
  }
  if (semester) {
    whereClause.push("p.semester = :semester");
    replacements.semester = semester;
  }
  if (course) {
    whereClause.push("s.course = :course");
    replacements.course = course;
  }
  if (branch) {
    whereClause.push("s.branch = :branch");
    replacements.branch = branch;
  }

  if (whereClause.length > 0) {
    query += " WHERE " + whereClause.join(" AND ");
  }

  try {
    const projects = await sequelize.query(query, {
      replacements,
      type: sequelize.QueryTypes.SELECT,
    });

    res.json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const create = async (year, semester, members, school,domain,outcome ) => {
  try {
    const tempValue = await getLastProjectId(year, semester);

    const [guide, reviewer] = await Teacher.findAll({
      where: {
        School: school,
      },
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
      Domain:domain,
      ProjectOutcome:outcome
    });

    const document = await ProjectDocument.create({
      ProjectID: tempValue,
    });

    const guides = await Guide.create({
      ProjectID: tempValue,
      GuideID: guide.dataValues.TeacherID,
      ReviewerID: reviewer.dataValues.TeacherID,
    });

    return tempValue; // Return the tempValue for the response
  } catch (error) {
    console.error("Error creating project and group:", error);
    throw error; // Throw the error to handle it in the calling function
  }
};

router.post("/create", async (req, res) => {
  try {
    const { year, semester, admissionNumber, members, user,domain,outcome } = req.body;
    const extractedChars = admissionNumber.match(/[A-Z]+/)[0];
    const data = await isAbleToCreateProject(admissionNumber);
    if (data.length > 0) {
      throw new Error(`You are already registered with group id ${data}`);
    }
    const tempValue = await create(year, semester, members, extractedChars,domain,outcome);

    const marks = await Marks.create({
      ProjectID: tempValue,
      StudentID:admissionNumber,
    
    });
    const group = await ProjectMember.create({
      ProjectID: tempValue,
      StudentID: admissionNumber,
      Review1Marks:marks.dataValues.MarksID,
      Review2Makrs: "0",
      CurrentStatus: "registered by self",
      Addby: user,
    });
    res
      .status(200)
      .json({ message: "Project and group created successfully", tempValue });
  } catch (error) {
    console.error("Error creating project and group:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
function generateOtp(){
  return Math.floor(100000 + Math.random() * 900000).toString();
}
router.post('/generate-otp',async(req,res)=>{
  const {requestUser,Email} = req.body;
  const otp = generateOtp();
  try {
      const resposne = await Otp.create({ Email: Email, Otp: otp });
      const htmlQuery = `
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  text-align: center;
              }
              .container {
                  margin: 20px auto;
                  padding: 20px;
                  border: 1px solid #ccc;
                  max-width: 600px;
              }
              h1 {
                  color:#50C878;
                  font-style:italic;
              }
              
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Hello ${requestUser} is request you to add in the Project Group</h1>
              <p>Your Code for approval is :</p>
              <h2>${otp}</h2>
          </div>
      </body>
      </html>
  `;
      const mailResponse = await mailSender(Email, "Your OTP for verification is ", htmlQuery);

      if(resposne){
        return  res.status(200).json({message:"OTP generatedSuccessfully"});
      }
      res.status(404).json({message:'Unable to create the OTP'});
  } catch (error) {
      console.error(error);
      return 500;
  }
})
router.post("/addStudnets/:projectID", async (req, res) => {
  const projectID = req.params.projectID;
  const { admissionNumber, user, otp, email } = req.body;

  try {
    const OtpData = await Otp.findAll({
      where: {
        Email: email,
        Otp: otp,
      }
    });

    if (!OtpData || OtpData.length === 0) {
      return res.status(400).json({ message: "Incorrect OTP" });
    }

    const data = await isAbleToCreateProject(admissionNumber);
    if (data.length > 0) {
      return res.status(501).json({
        message: "You are already registered with group id",
        projectId: data,
      });
    }

    // Perform project member creation after OTP verification and project check
    const marks = await Marks.create({
      ProjectID: projectID,
      StudentID: admissionNumber,
    });

    const member = await ProjectMember.create({
      ProjectID: projectID,
      StudentID: admissionNumber,
      Review1Marks: marks.dataValues.MarksID,
      Review2Marks: "0",
      CurrentStatus: "registered by self",
      Addby: user,
    });

    // If everything succeeds, destroy the OTP data
    await OtpData[0].destroy();

    res.status(200).json({ message: "Student added successfully" });

  } catch (error) {
    console.error("Error adding student:", error);
    res.status(404).json({ error: error });
  }
});


router.get("/pdSpecific", async (req, res) => {
  const userID = req.query.userID;
  let role = req.query.role;
  const xData = req.query.xData;
  if (role === "Admin" && xData) {
    role = "Teacher";
  }
  console.log(role);
  try {
    let value;

    if (role === "Admin") {
      const projectId = await ProjectMember.findAll({
        attributes: ["ProjectID"],
        where: {
          StudentID: userID, // Assuming StudentID is the correct field for comparison
        },
      });

      if (projectId.length > 0) {
        value = projectId[0].ProjectID;
      } else {
        return res
          .status(404)
          .json({ message: "No projects found for the given student" });
      }
    } else if (role === "Student") {
      const projectId = await ProjectMember.findAll({
        attributes: ["ProjectID"],
        where: {
          StudentID: userID, // Assuming StudentID is the correct field for comparison
        },
      });

      if (projectId.length > 0) {
        value = projectId[0].ProjectID;
      } else {
        return res
          .status(404)
          .json({ message: "No projects found for the given student" });
      }
    } else {
      value = userID;
    }

    const data = await sequelize.query(
      "SELECT * FROM Projects AS p " +
        "JOIN ProjectMembers AS pm ON p.ProjectID = pm.ProjectID " +
        "JOIN Students AS s ON pm.StudentId=s.AdmissionNumber " +
        "WHERE pm.ProjectID = :ProjectID",
      {
        replacements: { ProjectID: value },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json({ message: "Successfully fetched the data", data });
  } catch (error) {
    console.error("Error while fetching the data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/changeprojectStatus/:projectID", async (req, res) => {
  const projectId = req.params.projectID;
  // const { title, abstract } = req.body;

  try {
    const [updatedRows] = await Project.update(
      {
        Status: "Approved",
      },
      {
        where: { ProjectID: projectId },
      }
    );

    if (updatedRows > 0) {
      res.status(200).json({ message: "Data added successfully" });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/groupData/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const response = await ProjectMember.findAll({
      where: { ProjectID: projectId },
    });
    if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(501).json({ message: "Internal server Error" });
  }
});
//ProjectDocuments

router.get("/allDocument", async (req, res) => {
  try {
    const response = await ProjectDocument.findAll({});
    if (response) {
      return res.status(200).json(response);
    }
    res.status(401).json({ message: "unable to fetch the data" });
  } catch (error) {
    res.status(501).json({ message: "Internal server Error" });
  }
});

router.get("/documentDetails/:projectID", async (req, res) => {
  const projectId = req.params.projectID;
  try {
    const response = await ProjectDocument.findAll({
      where: {
        ProjectID: projectId,
      },
    });
    if (response) {
      return res.status(200).json(response);
    }
    res.status(401).json({ message: "unable to fetch" });
  } catch (error) {
    res.status(501).json({ message: "Internal server Error" });
  }
});
router.post("/addprojectTitle/:projectID", async (req, res) => {
  const projectId = req.params.projectID;
  const { title, abstract } = req.body;

  try {
    const [updatedRows] = await ProjectDocument.update(
      {
        ProjectTitle: title,
        ProjectAbstract: abstract,
      },
      {
        where: { ProjectID: projectId },
      }
    );
    if (updatedRows > 0) {
      res
        .status(200)
        .json({ message: "Data added successfully", title, abstract });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/addProjectDocuemnt/:projectId", async (req, res) => {
  const { documentName, Link } = req.body;
  const projectId = req.params.projectId;
  try {
    const [updatedRow] = await sequelize.query(
      `UPDATE ProjectDocuments SET ${documentName} = :Link WHERE ProjectID = :projectId;`,
      {
        replacements: {
          Link,
          projectId,
        },
      }
    );
    if (updatedRow) {
      return res.status(200).json({ message: "Document updated successfully" });
    }
    res.status(404).json({ message: "Unable to update Document" });
  } catch (error) {
    console.error("Error updating marks:", error);
    res.status(500).json({ error: "Internal Server Error" });
    console.log("error");
  }
});

router.get("/projectData/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const data = await sequelize.query(
      "SELECT p.*, pm.*, s.Name, s.AdmissionNumber, s.Email, s.Phone " +
        "FROM ProjectMembers AS pm " +
        "JOIN Projects AS p ON pm.ProjectID = p.ProjectID " +
        "JOIN Students AS s ON pm.StudentID = s.AdmissionNumber " +
        "WHERE pm.ProjectID = :ProjectID;",
      {
        replacements: { ProjectID: projectId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (data)
      return res.json({ message: "Successfully fetched the data", data });
    res.json({ message: "Unable to fetch the data" });
  } catch (error) {
    console.error("Error while fetching the data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/create-rest-group", async (req, res) => {
  try {
    const { Year, Semester, numberOfTeammates, school } = req.body;

    const query = notRegistered(Year, Semester);

    let response = await sequelize.query(query, {
      replacements: {year:Year, semester:Semester },
      type: sequelize.QueryTypes.SELECT,
    });
    let i = 0;

while (i < response.length) {
  const remainingMembers = response.length - i;
  const membersToAdd = Math.min(numberOfTeammates, remainingMembers);
  const tempArray = response.slice(i, i + membersToAdd);
  i = i + membersToAdd;
  const GroupID = await create(Year, Semester, numberOfTeammates, school);
  const projectMemberResults = await Promise.all(
    tempArray.map(async (data) => {
      // Create a Marks entry for the current student
      console.log("the data is ",data);
      const marks = await Marks.create({
        ProjectID: GroupID,
        StudentID: data.AdmissionNumber,
      });
  
      // Create a ProjectMember entry for the current student with the MarksID reference
      const projectMember = await ProjectMember.create({
        ProjectID: GroupID,
        StudentID: data.AdmissionNumber,
        Review1Marks: marks.dataValues.MarksID, // Use the MarksID from the newly created Marks entry
        Review2Marks: "0",
        CurrentStatus: "registered by admin",
        Addby: "admin",
      });
  
      return [marks, projectMember]; // Return both the Marks and ProjectMember entries
    })
  );
  
}
    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


//marks orute

router.get("/marks-parameter",async(req,res)=>{

  try{
    const query = `desc GuideMarks;`
    const response = await sequelize.query(query,{type:sequelize.QueryTypes.SELECT});
    const query2 = `desc ReviewerMarks;`
    const response2 = await sequelize.query(query2,{type:sequelize.QueryTypes.SELECT});
    if(response){
     return  res.status(200).json({response,response2});
    }
    res.status(404).json({message:"Unable to find the table details"});
  }catch(error)
  {
    res.status(500).json({message:"Internal server Error"});
  }
})

module.exports = router;
