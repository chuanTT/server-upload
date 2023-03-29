const express = require('express');
const uploadFileController = require('../controller/uploadFileController');
const { verifyToken } = require('../middleware/tokenMiddleware');
const { fileUpload } = require('../middleware/uploadFile');
const router = express.Router()

router.post('/upload-file',verifyToken,fileUpload, uploadFileController.uploadFile)
router.delete('/delete-file',verifyToken, uploadFileController.unlinkFileUpload)

module.exports = router