const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');


const sendEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'masood.bscs19seecs@seecs.edu.pk', // Change to your recipient
    from: 'ajwadmasood@hotmail.com', // Change to your verified sender
    subject: 'One Time Password',
    text: 'Your six digit OTP is 456823',
    //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  const info = await sgMail.send(msg);
  res.json(info);
};

module.exports = sendEmail;
