const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('config.env') });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = (messageContent, reciever) => {
  const msg = {
    to: reciever, // Change to your recipient
    from: {
      name: 'RFID API',
      email: 'gauravvirmani9175@gmail.com' // Change to your verified sender
    },
    subject: messageContent.subject,
    text: messageContent.text
  };
  sgMail
    .send(msg)
    .then((response) => {
      // console.log('Email sent');
      // console.log(response[0].statusCode);
      // console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
};
