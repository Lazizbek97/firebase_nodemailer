const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendEmail = functions.https.onRequest((request, response) => {
  // Parse the request body to get the email details
  
  // Create a new transporter using the Gmail service
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: "lazizbekfayziyev@gmail.com",// sender's gmail
      pass: "gmail_password",
    },
  });
  
  // Create the email options
  const mailOptions = {
    from: "lazizbekfayziyev@gmail.com",// sender's gmail
    to: request.body.toEmail,
    subject: request.body.subject,
    text: request.body.body,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return response.send({
        data: error,
      });
    } else {
      return response.send({
        data: "Email sent: " + info.response,
      });
    }
  });
});
