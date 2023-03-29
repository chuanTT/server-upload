require("dotenv").config();
const jwt = require("jsonwebtoken");
const { isEmptyObj } = require("../common/functions");

const verifyTokenFuc = (token) => {
  let data = {};

  data = jwt.verify(token, process.env.SECRET_KEY);

  return data;
};

const getAuthorizationToken = (req) => {
  let isCheckToken = false;
  let authoriza = req.header("Authorization");
  let token = authoriza && authoriza.split(" ")[1];

  if (!token) {
    isCheckToken = true;
  }

  return {
    checkToken: isCheckToken,
    token,
  };
};

const verifyToken = async (req, res, next) => {
  let { token, checkToken } = getAuthorizationToken(req);

  if (checkToken) {
    return res.status(403).json({
      msg: "Token không hợp lệ",
    });
  }

  try {
    let data = verifyTokenFuc(token);

    if (isEmptyObj(data)) {
      return res.status(403).json({
        msg: "Token không hợp lệ",
      });
    }

    next();
  } catch (err) {
    return res.status(200).json({
      msg: "Token hết hạn",
    });
  }
};

module.exports = {
  verifyToken,
  verifyTokenFuc,
  getAuthorizationToken,
};
