 const path = require('path')
require('dotenv').config()
const nodemailer = require('nodemailer');
const { google } = require("googleapis");

module.exports.sendEmail = function (email, content) {
  const myOAuth2Client = new google.auth.OAuth2(
    clientId = process.env.CLIENT_ID,
    clientSecret = process.env.CLIENT_SECRET,
     'https://developers.google.com/oauthplayground'
 )

 myOAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});

 try{

  const myAccessToken = myOAuth2Client.getAccessToken();

 let transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     type: 'OAuth2',
     user: process.env.AUTH_USER,
     clientId: process.env.CLIENT_ID,
     clientSecret: process.env.CLIENT_SECRET,
     refreshToken: process.env.REFRESH_TOKEN,
     accessToken: myAccessToken
   }
 });


 let mailOptions = {
   from: "TaskMaster<nurud43@gmail.com>", // sender address
   to: email, // list of receivers
   subject: 'Welcome to TaskMaster', // Subject line
   text: content,
   html: `<h2 style="background: #0e0520; color: white; padding: 10px; border: 3px solid #517ca4; text-align: center">${content}</h2>` // html body
 };


 let trans = transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }

  console.log(trans);

  console.log('Message %s sent: %s', info.messageId, info.response);
   //res.redirect(req.originalUrl);
});

 }catch(error){
  return error
 }
}






module.exports.nodeEmail = function (email, content) {

  let textAccount = nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: textAccount.user,
      pass: textAccount.pass
    }
  })

  let mailOptions = {
    from: "TaskMaster<nurud43@gmail.com>", // sender address
    to: email, // list of receivers
    subject: 'Welcome to TaskMaster', // Subject line
    text: content,
    html: `<h2 style="background: #0e0520; color: white; padding: 10px; border: 3px solid #517ca4; text-align: center">${content}</h2>` // html body
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
 
    console.log('Message %s sent: %s', info.messageId, info.response);
     //res.redirect(req.originalUrl);
  });

}
