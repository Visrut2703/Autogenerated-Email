const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const ejs = require('ejs');
require('dotenv').config();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
var mail = ""
app.post("/", function (req, res) {
  res.sendFile(__dirname + "/email.html")
  mail = req.body.email;  
  console.log(mail);
  res.sendFile(__dirname + "/after.html");
  const mailOptions = {
    from: 'visrutlukhi9722@gmail.com',
    to: mail,
    subject: 'Auto generated hai',
    text: 'ignore marde'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});


app.listen(3000, function () {
  console.log("Running!!");
})