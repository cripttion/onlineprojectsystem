const nodeMailer = require('nodemailer');
require('dotenv').configDotenv()
const mailSender = async (email, title, body) => {
    try {
        // Transporter
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            host:'smtp.gmail.com',
            port:true,
            secure:true,
            auth: {
                user: process.env.MAIL_SENDER_USER,
                pass: process.env.MAIL_SENDER_USER_PASSWORD
            }
        });
        // Send email to user
        const info = await transporter.sendMail({
            from:{
              name:'Galgotias Universtiy-Project team',
              address:process.env.MAIL_SENDER_USER,
            }, 
            to:email,
            subject:title,
            html:body,
        });

        console.log("Email sent:", info.response);
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

module.exports = mailSender;
