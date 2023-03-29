const { upload } = require("../middleware/uploadFile");
const { unlinkFile } = require("../common/functions");

const uploadFile = (req, res) => {
  upload(req, req, function () {
    if (req.fileValidationError) {
      return res.status(200).json({
        status: 402,
        msg: "File không đúng định dạng",
      });
    } else if (!req.file) {
      return res.status(200).json({
        status: 402,
        msg: "Vui lòng chọn file",
      });
    }

    return res.status(200).json({
      status: 200,
      msg: "Tải hình ảnh thành công",
      data: {
        name: req.file.filename,
        full_path: `${req.getUrlPublic()}${req.file.filename}`,
      },
    });
  });
};

const unlinkFileUpload = async (req, res) => {
  let { nameFile } = req.body;
  let json = {
    code: 402,
    msg: "Xóa hình ảnh thất bại",
  };

  if (nameFile) {
    const ulink = await unlinkFile(nameFile);

    if (ulink) {
      json.code = 200;
      json.msg = "Xóa hình ảnh thành công";
    }
  }

  return res.status(200).json(json);
};

module.exports = {
  uploadFile,
  unlinkFileUpload,
};
