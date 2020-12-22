require('dotenv').config();

const WEBSITE_URL = {
  // CLIENT_HOME_PAGE_URL: process.env.CLIENT_HOME_PAGE_URL,
  // SERVER_HOME_PAGE_URL: process.env.SERVER_HOME_PAGE_URL
  CLIENT_HOME_PAGE_URL: '/',
  SERVER_HOME_PAGE_URL: ''
};

const GOOGLE_TOKENS = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
};

const MONGODB = {
  MONGODB_URL: process.env.MONGODB_URL
};

const SESSION = {
  SESSION_SECRET: process.env.SESSION_SECRET
};

const KEYS = {
  ...WEBSITE_URL,
  ...GOOGLE_TOKENS,
  ...MONGODB,
  ...SESSION
};

module.exports = KEYS;
