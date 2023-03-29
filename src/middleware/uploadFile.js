const { uploadFile } = require("../common/functions");

const { fileUpload, upload } = uploadFile({ name: "avatar" });

const ValidateUploadFile = (upload = () => {}, sussesFuc = () => {}) => {
  upload(req, res, async function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
    if (req.fileValidationError) {
      return res.status(200).json({
        status: 402,
        msg: "upload file error",
      });
    } else if (!req.file) {
      return res.status(200).json({
        status: 402,
        msg: "Please select an image to upload",
      });
    }

    sussesFuc(req, res)
  });
}

module.exports = {
  fileUpload,
  upload,
  ValidateUploadFile
};
