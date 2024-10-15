const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + path.extname(file.originalname);
        cb(null, 'poster-' + uniqueName); // Corrected file naming
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
