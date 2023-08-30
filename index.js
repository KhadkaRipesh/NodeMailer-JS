const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const config = require('./config');
const OAuth2 = google.auth.OAuth2;

const OauthClient = new OAuth2(config.clientId, config.clientSecret);
OauthClient.setCredentials({ refresh_token: config.refrest_token });

async function sendMail() {
  try {
    const accessToken = OauthClient.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: config.user,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: config.refrest_token,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      to: 'khadkanripesh@gmail.com',
      subject: 'Test Email',
      text: 'This is a test email sent using Nodemailer.',
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log(result, 'Email Sent Successfully.'))
  .catch((error) => console.log(error.message));
