require('dotenv').config();

const config = module.exports = {
    MONGODB_URI: process.env.MONGODB_URI,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
};
