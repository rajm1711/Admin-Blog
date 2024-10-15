const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads');
    },

    filename : function(req,file,cb){
        const uniqueName = Date.now() + '-' + path.extname(file.originalname);
        cb(null,file.filename + '-' + uniqueName)
    }
})

const upload = multer ({stogare : storage})

module.exports = upload;
