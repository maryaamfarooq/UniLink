// const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const User = require('../models/User')

const sendEmail = async (req,res) => {

  const {email} = req.body;
  // console.log("email" + email);

  const userExists = await User.findOne({ email });
  // console.log("userExists" + userExists);
  if (userExists) {
    throw new BadRequestError("A user is already created with this email");
  }

  let config = {
    service: 'gmail',
    auth:{
      user:'unilink.connecting@gmail.com',
      pass: 'nbzqqtypgqmbzahv'
    }
  }

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product:{
      name:"Unilink",
      link:"https://mailgen.js"
    }
  })

  const otp = Math.floor(1000 + Math.random() * 9000);

  let response = {
    body: {
      // name: username,
      intro: `Your One Time Password is ${otp}`,
      // table: {
      //   data: [
      //     {
      //       item:"NodeMailer Stack book",
      //       description:"A backend application",
      //       price: "$10.99",
      //     }
      //   ]
      // },
      outro: "Happy Connecting!",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: "unilink.connecting@gmail.com",
    to: email,
    subject: "OTP",
    html: mail
  };

  transporter.sendMail(message).then(()=>{
    return res.status(201).json({
      // msg:"you should receive an email"
      otp:otp
    })
  }).catch(error => {
    return res.status(500).json({error});
  })

};

module.exports = { sendEmail };