const multer = require("multer");
const directory = __dirname + "/../public/assets/img";

const filter = (req, file, cb) => {
  if (file.mimetype.includes("image/jpeg") | file.mimetype.includes("image/jpg") | file.mimetype.includes("image/png")) {
    cb(null, true);
  } else {
    cb(new Error("Harap upload file gambar bertipe JPG/PNG"));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "FreeWrite-" + uniqueSuffix + "." + file.originalname.split(".").pop());
  },
});

const uploadImage = multer({ storage: storage, fileFilter: filter });

module.exports = uploadImage;
