const multer = require('multer');

// กำหนดโฟลเดอร์ที่จะเก็บไฟล์ที่อัปโหลด
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
