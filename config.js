const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refrest_token: process.env.REFRESH_TOKEN,
};
