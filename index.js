// Import necessary modules and configurations
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const config = require('./config'); // Import configuration from config file
const OAuth2 = google.auth.OAuth2;

// Create an OAuth2 client using the provided client ID and client secret
const OauthClient = new OAuth2(config.clientId, config.clientSecret);

// Set the refresh token for the OAuth2 client
OauthClient.setCredentials({ refresh_token: config.refrest_token });

// Define an asynchronous function to send an email
async function sendMail() {
  try {
    // Get the access token using the OAuth2 client
    const accessToken = OauthClient.getAccessToken();

    // Create a transporter using Nodemailer with Gmail service and OAuth2 authentiction
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'superduber83@gmail.com', // Sender's email address
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: config.refrest_token,
        accessToken: accessToken,
      },
    });

    // Define the email options
    const mailOptions = {
      to: 'khadkanripesh@gmail.com', // Recipient's email address
      subject: 'Test Email', // Email subject
      text: 'This is a test email sent using Nodemailer.', // Email text
    };

    // Send the email and wait for the result
    const result = await transport.sendMail(mailOptions);
    return result; // Return the result of sending the email
  } catch (error) {
    return error; // Return any errors that occur during the process
  }
}

// Call the sendMail function and handle the result or error
sendMail()
  .then((result) => console.log(result, 'Email Sent Successfully.'))
  .catch((error) => console.log(error.message));
