var nodemailer = require('nodemailer');

const mail = (receiverMail, mailSubject, mailBody) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.PLATFORM_EMAIL,
          pass: process.env.PLATFORM_PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.PLATFORM_EMAIL,
        to: receiverMail,
        subject: mailSubject,
        text: mailBody
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
};

module.exports = mail;