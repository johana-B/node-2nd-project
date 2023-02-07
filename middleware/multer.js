const multer = require("multer");

//SET Storage
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(" ").join("-");;
        cb(null, Date.now() + '-' + fileName);
    },
});
const uploadOptions = multer({ storage });

module.exports = { uploadOptions };