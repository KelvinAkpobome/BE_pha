const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

//load config
dotenv.config({path: './config/config.env'});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})