const { htmlquery } = require("../../../utility/htmlquery");
const mailSender = require("../../../utility/mailSender");


const sendForVerificataion = async(req,res)=>{
    const {requestUser,Email,projectID} = req.body;
  try {
      const htmlQuery = `<html>
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
              <a href="http://localhost:5000/v1/student/addStudentHTML?projectID=${projectID}" class="btn">Verify Now</a>

          </div>
      </body>
      </html>`;
      
      const mailResponse = await mailSender(Email, "Your OTP for verification is ", htmlQuery);

     
        return  res.status(200).json({message:"OTP generatedSuccessfully"});
      
    //   res.status(404).json({message:'Unable to create the OTP'});
  } catch (error) {
      console.error(error);
      return 500;
  }
}

module.exports = sendForVerificataion;