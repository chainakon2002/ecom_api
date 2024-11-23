const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: 'daw1e3jbg',
    api_key: '767921645967569',
    secure: true,
    api_secret: process.env.CLOUDINARY_SECRET,

});

module.exports = cloudinary;