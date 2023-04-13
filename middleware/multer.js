const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const uploadOptions = multer({
  storage: multer.diskStorage({}),
//   limits: { fileSize: 500000 }
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


module.exports = { uploadOptions, cloudinary};

//SET Storage
// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public/uploads");
//     },
//     filename: function (req, file, cb) {
//         const fileName = file.originalname.split(" ").join("-");;
//         cb(null, Date.now() + '-' + fileName);
//     },
// });