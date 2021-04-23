const multer = require("multer");
// for profile
const profilestore = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./profile");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const profilefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const profile = multer({ storage: profilestore, fileFilter: profilefilter });

module.exports = profile;
