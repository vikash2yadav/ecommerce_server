const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

const mailOptions = {
  from: process.env.MAIL_EMAIL, // sender address
  to: 'yadavrohan1825@gmail.com', // list of receivers
  subject: "Welcome to Drop HRM", // Subject line
  text: "", // plain text body
};


class Mailer {

  async forgotPasswordEmail(data) {
    mailOptions.to = data?.email;
    mailOptions.subject = "Reset Your Password.";
    if (data?.otp) {
      delete mailOptions.text;
      mailOptions.html = `<p> Hello Sir, Your One Time Password is </p> <h2> ${data?.otp} </h2> <P> This OTP is valid for next 2 minutes. </p> <p> Do not share OTP for security reason. </p>`;
    } else {
      delete mailOptions.html;
      mailOptions.text = `Hello Sir , Your Reset Password Link is ${data?.forgot_link}/${data?.token}`;
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info?.response);
      }
    });
  }
}

module.exports = Mailer;
