const multer = require("multer");
const fs = require("fs");
const path = require('path');


const storageFile = (folder = 'images') => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(DIR_ROOT, `public/${folder}/`));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + '-' +file.originalname);
    },
  });

  return storage;
};

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(null, false);
  }

  cb(null, true);
};

const uploadFile = ({
  name,
  isMutile = false,
  pathRoot = 'images',
  countFile = 2,
  validateFilterFile = imageFilter,
}) => {
  let fileUpload = multer({ storage: storageFile(pathRoot), fileFilter: validateFilterFile });
  let upload = null;

  if (isMutile) {
    fileUpload = fileUpload.array(name, countFile);
    upload = multer().array(name)
  } else {
    fileUpload = fileUpload.single(name);
    upload = multer().single(name)
  }
  return {
    fileUpload,
    upload
  }
};

const unlinkFile = async (nameFile, folder = "images") => {
  let isChecking = false;
  let pathRoot = path.join(DIR_ROOT, `/public/${folder}/${nameFile}`);

  console.log(pathRoot)
  if (fs.existsSync(pathRoot)) {
    fs.unlinkSync(pathRoot);
    isChecking = true
  } else {
    isChecking = false
  }

  return isChecking;
};


const isEmptyObj = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

module.exports = {
  storageFile,
  uploadFile,
  unlinkFile,
  isEmptyObj
};
