const multer = require('multer');
exports.uploadUserImage = multer({
    storage: multer.diskStorage({
        destination: 'assets/users-images/',
        filename: function (req, file, callback) {
            callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        }
    })
}).single('user-image'); 