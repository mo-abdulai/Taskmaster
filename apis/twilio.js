
require('dotenv').config();

module.exports.sendSMS = function(phone, content) {

  // message = "Hello world";
  // phone = "+17577526127"

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
       body: content,
       from: process.env.TWILIO_PHONE_NUMBER,
       to: phone
     })
   
     .then(message => console.log(message.sid));
  }



    
    
  
  