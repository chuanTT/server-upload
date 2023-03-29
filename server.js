require("dotenv").config();
const express = require("express");
var path = require('path');
const cors = require("cors");
const app = express();
const router = require("./src/router/main")
const port = process.env.PORT || 3001;

const public = "public";

global.DIR_ROOT = `${__dirname}\\src\\`;

app.use(express.static(path.join(DIR_ROOT, public))); 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());
app.use(function (req, res, next) {
  req.getUrl = function () {
    return req.protocol + "://" + req.get("host") + req.baseUrl;
  };
  req.getUrlPublic = function ($folder = 'images') {
    return `${req.getUrl()}/${$folder}/`
  }
  return next();
});

app.use('/api/v1/', router)

app.listen(port);
