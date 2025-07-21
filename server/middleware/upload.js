const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
    return cb(new Error("Only images are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
